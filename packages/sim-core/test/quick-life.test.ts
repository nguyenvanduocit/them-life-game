import { describe, expect, test } from 'bun:test'
import { createPolicyDecider, DEFAULT_TRAITS } from '../src/decider'
import { createJevChecker } from '../src/checks'
import { planLife } from '../src/plan'
import { createRng } from '../src/rng'
import { playQuickLife, type QuickLifeDeps } from '../src/quick-life'
import type { TextSource } from '../src/text-source'
import type { GeneratedEvent } from '../src/types'
import { answersMatching, fakeEvaluator } from './fakes'
import { makeEvent } from './helpers'

const repeating = (event: GeneratedEvent): TextSource => ({ generate: async () => structuredClone(event) })

function deps(text: TextSource, over: Partial<QuickLifeDeps> = {}): QuickLifeDeps {
  return {
    text,
    checker: null,
    rng: createRng(1),
    decider: createPolicyDecider(createRng(2)),
    traits: DEFAULT_TRAITS,
    tone: { name: 'standard', maxIntensity: 3 },
    name: 'Gary Pembrook',
    seed: 11,
    ...over,
  }
}

describe('playQuickLife', () => {
  test('plays every highlight and always ends in death, within 5 seconds', async () => {
    const r = await playQuickLife(deps(repeating(makeEvent({ intensity: 2 }))))
    const plan = planLife(11)
    expect(r.steps).toHaveLength(plan.length)
    expect(r.final.alive).toBe(false)
    expect(r.final.causeOfDeath).toBe('Unspecified causes')
    expect(r.final.age).toBe(plan.at(-1)!.age)
    expect(r.final.log).toHaveLength(plan.length)
    expect(r.durationMs).toBeLessThan(5000)
  })

  test('keeps stats within bounds for 200 different lives', async () => {
    for (let seed = 0; seed < 200; seed++) {
      const r = await playQuickLife(deps(repeating(makeEvent({ intensity: 2 })), { seed }))
      for (const s of r.steps) {
        for (const k of ['health', 'happiness', 'notoriety'] as const) {
          expect(s.after.stats[k]).toBeGreaterThanOrEqual(0)
          expect(s.after.stats[k]).toBeLessThanOrEqual(100)
        }
      }
    }
  })

  test('ends early when an extreme event kills the Subject', async () => {
    const lethal = makeEvent({ intensity: 3 })
    for (const c of lethal.choices) c.outcome.effects = [{ kind: 'death', cause: 'Optimism' }]
    const r = await playQuickLife(deps(repeating(lethal)))
    expect(r.steps).toHaveLength(1)
    expect(r.final).toMatchObject({ alive: false, causeOfDeath: 'Optimism' })
  })

  test('is deterministic for the same seed and the same text', async () => {
    const run = () => playQuickLife(deps(repeating(makeEvent({ intensity: 2 })), { seed: 5 }))
    const [a, b] = await Promise.all([run(), run()])
    expect(a.final).toEqual(b.final)
  })

  test('works with a Jev checker in the loop', async () => {
    const event = makeEvent({ intensity: 2 })
    const checker = createJevChecker(fakeEvaluator((_s, q) => answersMatching(event, q)))
    const r = await playQuickLife(deps(repeating(event), { checker }))
    expect(r.steps.every((s) => s.result.source === 'ai')).toBe(true)
  })

  test('survives a text source that always fails by using the fallback pool', async () => {
    const broken: TextSource = {
      generate: async () => {
        throw new Error('down')
      },
    }
    const r = await playQuickLife(deps(broken))
    expect(r.steps.every((s) => s.result.source === 'fallback')).toBe(true)
    expect(r.final.alive).toBe(false)
  })

  test('rejects when the caller aborts', async () => {
    const controller = new AbortController()
    controller.abort()
    await expect(playQuickLife(deps(repeating(makeEvent())), controller.signal)).rejects.toThrow()
  })
})

describe('requests built by the runner always satisfy the gateway schema (review finding 11)', () => {
  test('even for a fractional, negative or huge seed', async () => {
    const { eventRequestSchema } = await import('../src/text-source')
    for (const seed of [0.123456, -7, 1e21]) {
      const seen: unknown[] = []
      const text: TextSource = { generate: async (req) => { seen.push(req); return makeEvent({ intensity: 2 }) } }
      await playQuickLife(deps(text, { seed }))
      expect(seen.length).toBeGreaterThan(10)
      for (const req of seen) expect(eventRequestSchema.safeParse(req).success).toBe(true)
    }
  })
})
