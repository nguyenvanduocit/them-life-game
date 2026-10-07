import { describe, expect, test } from 'bun:test'
import { EvaluatorError } from '../src/evaluator'
import { createJevChecker } from '../src/checks'
import { FALLBACK_EVENTS } from '../src/fallback'
import { produceEvent, type PipelineDeps } from '../src/pipeline'
import { createRng } from '../src/rng'
import type { EventRequest, TextSource } from '../src/text-source'
import type { Effect, GeneratedEvent } from '../src/types'
import { answersMatching, fakeEvaluator } from './fakes'
import { makeEvent, makeState } from './helpers'

const request: EventRequest = {
  stateSummary: 'Gary',
  logTail: [],
  tone: { name: 'standard', maxIntensity: 2 },
  highlight: { index: 6, kind: 'money', stage: 'adult', age: 34 },
  seed: 1,
  attempt: 0,
}

/** Plays back a script: a value is returned, an Error is thrown, 'hang' waits for the abort signal. */
function scripted(steps: (unknown | Error | 'hang' | 'deaf')[]): TextSource & { attempts: number[] } {
  const attempts: number[] = []
  return {
    attempts,
    async generate(req, signal) {
      attempts.push(req.attempt)
      const step = steps[Math.min(attempts.length - 1, steps.length - 1)]
      if (step instanceof Error) throw step
      if (step === 'deaf') return new Promise(() => {}) // never settles and ignores the signal
      if (step === 'hang') {
        return new Promise((_resolve, reject) => signal?.addEventListener('abort', () => reject(new Error('timed out'))))
      }
      return step
    },
  }
}

const goodChecker = () => createJevChecker(fakeEvaluator((_s, q) => answersMatching(currentEvent, q)))
let currentEvent: GeneratedEvent = makeEvent()

function deps(text: TextSource, over: Partial<PipelineDeps> = {}): PipelineDeps {
  return { text, checker: goodChecker(), rng: createRng(1), timeoutMs: 50, ...over }
}

describe('produceEvent', () => {
  test('ships a good AI event on the first attempt', async () => {
    currentEvent = makeEvent()
    const r = await produceEvent(deps(scripted([makeEvent()])), request, makeState())
    expect(r).toMatchObject({ source: 'ai', attempts: 1, notes: [], funnyScore: 3 })
    expect(r.event.narration).toBe(makeEvent().narration)
  })

  test('clamps out-of-budget effects before the player sees them', async () => {
    const greedy = makeEvent()
    greedy.choices[0]!.outcome.effects = [{ kind: 'stat', stat: 'health', delta: 500 }, { kind: 'death', cause: 'Optimism' }] as Effect[]
    const clamped = structuredClone(greedy)
    clamped.choices[0]!.outcome.effects = [{ kind: 'stat', stat: 'health', delta: 30 }]
    currentEvent = clamped // what the checker will be shown, so its answers match
    const r = await produceEvent(deps(scripted([greedy])), request, makeState({ stage: 'adult' }))
    expect(r.event.choices[0]!.outcome.effects).toEqual([{ kind: 'stat', stat: 'health', delta: 30 }])
  })

  test('regenerates after an invalid event and passes the attempt number to the text source', async () => {
    currentEvent = makeEvent()
    const text = scripted([{ nope: true }, makeEvent()])
    const r = await produceEvent(deps(text), request, makeState())
    expect(r).toMatchObject({ source: 'ai', attempts: 2 })
    expect(r.notes[0]).toContain('invalid event')
    expect(text.attempts).toEqual([0, 1])
  })

  test('falls back after three invalid events', async () => {
    const r = await produceEvent(deps(scripted([null])), request, makeState())
    expect(r.source).toBe('fallback')
    expect(r.attempts).toBe(3)
    expect(FALLBACK_EVENTS.some((e) => e.narration === r.event.narration)).toBe(true)
  })

  test('falls back when the text source keeps failing', async () => {
    const r = await produceEvent(deps(scripted([new Error('502')])), request, makeState())
    expect(r.source).toBe('fallback')
    expect(r.notes[0]).toContain('text source failed: 502')
  })

  test('a text source that hangs is cut off by the timeout and falls back', async () => {
    const started = Date.now()
    const r = await produceEvent(deps(scripted(['hang']), { maxAttempts: 2 }), request, makeState())
    expect(r.source).toBe('fallback')
    expect(Date.now() - started).toBeLessThan(1000)
  })

  test('rejects an event more intense than the tone allows', async () => {
    currentEvent = makeEvent()
    const r = await produceEvent(deps(scripted([makeEvent({ intensity: 3 }), makeEvent({ intensity: 2 })])), request, makeState())
    expect(r.attempts).toBe(2)
    expect(r.notes[0]).toContain('above the tone limit')
  })

  test('strips a death effect from a non-extreme event for a non-elder', async () => {
    const dying = makeEvent({ intensity: 2 })
    dying.choices[0]!.outcome.effects.push({ kind: 'death', cause: 'Optimism' })
    currentEvent = makeEvent()
    const r = await produceEvent(deps(scripted([dying])), request, makeState({ stage: 'adult' }))
    expect(r.event.choices[0]!.outcome.effects.some((e) => e.kind === 'death')).toBe(false)
  })

  test('regenerates when the verifier finds text and effects disagree', async () => {
    const event = makeEvent()
    currentEvent = event
    let call = 0
    const checker = createJevChecker(
      fakeEvaluator((_s, q) => {
        call++
        const a = answersMatching(event, q)
        return call === 1 ? { ...a, 'death:c1': { type: 'boolean', probability: 0.95 } } : a
      }),
    )
    const r = await produceEvent(deps(scripted([event]), { checker }), request, makeState())
    expect(r).toMatchObject({ source: 'ai', attempts: 2 })
    expect(r.notes[0]).toContain('text says the character dies')
  })

  test('safety is fail-closed: an unsafe event is dropped and three unsafe events mean fallback', async () => {
    const event = makeEvent()
    const checker = createJevChecker(fakeEvaluator((_s, q) => ({ ...answersMatching(event, q), safe: { type: 'boolean', probability: 0.3 } })))
    const r = await produceEvent(deps(scripted([event]), { checker }), request, makeState())
    expect(r.source).toBe('fallback')
    expect(r.notes).toHaveLength(3)
    expect(r.notes[0]).toContain('safety')
  })

  test('when Jev is unreachable the pipeline falls back at once', async () => {
    const checker = createJevChecker(
      fakeEvaluator(() => {
        throw new EvaluatorError('down')
      }),
    )
    const text = scripted([makeEvent()])
    const r = await produceEvent(deps(text, { checker }), request, makeState())
    expect(r).toMatchObject({ source: 'fallback', attempts: 1 })
    expect(text.attempts).toEqual([0])
  })

  test('a low funny score allows one regeneration, then ships the best candidate', async () => {
    const event = makeEvent()
    for (const c of event.choices) c.outcome.effects = c.outcome.effects.filter((e) => e.kind !== 'fact') // no facts: one Jev call per check
    const scores = [1, 0, 3]
    let call = 0
    const checker = createJevChecker(fakeEvaluator((_s, q) => ({ ...answersMatching(event, q), funny: { type: 'score', score: scores[call++] as number } })))
    const r = await produceEvent(deps(scripted([event]), { checker }), request, makeState())
    expect(r).toMatchObject({ source: 'ai', attempts: 2, funnyScore: 1 })
    expect(call).toBe(2)
  })

  test('without a checker only the deterministic verifier runs', async () => {
    const lying = makeEvent()
    lying.choices[1]!.outcome.narration = 'Then he dies.'
    const r = await produceEvent(deps(scripted([lying, makeEvent()]), { checker: null }), request, makeState())
    expect(r).toMatchObject({ source: 'ai', attempts: 2, funnyScore: null })
  })

  test('rejects when the caller aborts, instead of falling back', async () => {
    const controller = new AbortController()
    controller.abort()
    await expect(produceEvent(deps(scripted([makeEvent()])), request, makeState(), controller.signal)).rejects.toThrow()
  })

  test('a text source that ignores the abort signal is still cut off (review finding 2)', async () => {
    const started = Date.now()
    const r = await produceEvent(deps(scripted(['deaf']), { maxAttempts: 2 }), request, makeState())
    expect(r.source).toBe('fallback')
    expect(Date.now() - started).toBeLessThan(1000)
  })

  test('a checker that never answers falls back instead of hanging (review finding 2)', async () => {
    const checker = { check: () => new Promise<never>(() => {}) }
    const started = Date.now()
    const r = await produceEvent(deps(scripted([makeEvent()]), { checker }), request, makeState())
    expect(r.source).toBe('fallback')
    expect(r.notes[0]).toContain('judge unavailable')
    expect(Date.now() - started).toBeLessThan(1000)
  })
})
