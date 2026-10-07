import { describe, expect, test } from 'bun:test'
import { buildCheckQuestions, checkState, createJevChecker, DEFAULT_CHECK_CONFIG, deterministicVerify, readCheckAnswers, shownText } from '../src/checks'
import { EvaluatorError } from '../src/evaluator'
import { answersMatching, benignAnswers, fakeEvaluator } from './fakes'
import { makeEvent } from './helpers'

describe('buildCheckQuestions and checkState', () => {
  test('asks safe, tone, funny and three money/death questions per choice', () => {
    const q = buildCheckQuestions(makeEvent())
    expect(Object.keys(q)).toHaveLength(3 + 3 * 3)
    expect(q['death:c1']?.type).toBe('boolean')
    expect(q.funny?.type).toBe('score')
  })

  test('the state sent to Jev never contains the declared effects', () => {
    const state = checkState(makeEvent())
    expect(state).not.toContain('delta')
    expect(state).not.toContain('"kind"')
    expect(state).toContain('Mr. Dunmore studies the hot dog')
  })
})

describe('readCheckAnswers', () => {
  const event = makeEvent()
  const q = buildCheckQuestions(event)

  test('answers that agree with the effects pass cleanly', () => {
    const r = readCheckAnswers(event, answersMatching(event, q))
    expect(r.verify).toEqual({ ok: true, problems: [] })
    expect(r.judge).toEqual({ safe: true, onTone: true, funnyScore: 3 })
  })

  test('text that kills the character without a death effect is flagged', () => {
    const r = readCheckAnswers(event, answersMatching(event, q) && { ...answersMatching(event, q), 'death:c1': { type: 'boolean', probability: 0.95 } })
    expect(r.verify.ok).toBe(false)
    expect(r.verify.problems[0]).toContain('c1: text says the character dies')
  })

  test('a declared death that the text never mentions is flagged', () => {
    const dying = makeEvent()
    dying.choices[0]!.outcome.effects.push({ kind: 'death', cause: 'Optimism' })
    const r = readCheckAnswers(dying, answersMatching(makeEvent(), q))
    expect(r.verify.problems.some((p) => p.includes('a death effect is declared'))).toBe(true)
  })

  test('money lost in the text but not in the effects is flagged, and the reverse too', () => {
    const base = answersMatching(event, q)
    const said = readCheckAnswers(event, { ...base, 'loss:c1': { type: 'boolean', probability: 0.95 } })
    expect(said.verify.problems.some((p) => p.includes('c1: text says money is lost'))).toBe(true)
    const declared = readCheckAnswers(event, { ...base, 'loss:c2': { type: 'boolean', probability: 0.02 } })
    expect(declared.verify.problems.some((p) => p.includes('c2: a money loss is declared'))).toBe(true)
  })

  test('an unsure answer (between the thresholds) raises no problem', () => {
    const base = answersMatching(event, q)
    const r = readCheckAnswers(event, { ...base, 'death:c1': { type: 'boolean', probability: 0.5 } })
    expect(r.verify.ok).toBe(true)
  })

  test('safety is fail-closed: anything under the threshold is unsafe', () => {
    const base = answersMatching(event, q)
    expect(readCheckAnswers(event, { ...base, safe: { type: 'boolean', probability: 0.79 } }).judge.safe).toBe(false)
    expect(readCheckAnswers(event, { ...base, safe: { type: 'boolean', probability: 0.8 } }).judge.safe).toBe(true)
  })

  test('a missing answer throws EvaluatorError instead of passing', () => {
    const { safe: _safe, ...rest } = answersMatching(event, q)
    expect(() => readCheckAnswers(event, rest)).toThrow(EvaluatorError)
  })
})

describe('createJevChecker', () => {
  test('an event with no facts or causes is verified and judged with one batched call', async () => {
    const event = makeEvent()
    for (const c of event.choices) c.outcome.effects = c.outcome.effects.filter((e) => e.kind !== 'fact')
    const evaluator = fakeEvaluator((_s, q) => answersMatching(event, q))
    const result = await createJevChecker(evaluator).check(event)
    expect(evaluator.calls).toBe(1)
    expect(result.verify.ok).toBe(true)
  })

  test('propagates evaluator failure so the pipeline can fall back', async () => {
    const evaluator = fakeEvaluator(() => {
      throw new EvaluatorError('down')
    })
    await expect(createJevChecker(evaluator).check(makeEvent())).rejects.toThrow('down')
  })
})

describe('deterministicVerify', () => {
  test('flags text that says the character dies with no death effect', () => {
    const e = makeEvent()
    e.choices[1]!.outcome.narration = 'The rent is paid. Then he dies.'
    expect(deterministicVerify(e).ok).toBe(false)
  })

  test('accepts a death effect even when the text uses no death words', () => {
    const e = makeEvent()
    e.choices[0]!.outcome.effects.push({ kind: 'death', cause: 'Optimism' })
    expect(deterministicVerify(e).ok).toBe(true)
  })

  test('benignAnswers helper stays a valid answer set for every question', () => {
    const q = buildCheckQuestions(makeEvent())
    expect(Object.keys(benignAnswers(q))).toEqual(Object.keys(q))
  })
})

describe('everything the player can see is safety-checked (review finding 7)', () => {
  const event = makeEvent()
  event.choices[0]!.outcome.effects.push({ kind: 'death', cause: 'Choked on a SECRET-CAUSE' })

  test('shownText lists death causes and facts, once each', () => {
    expect(shownText(event)).toEqual(['Mr. Dunmore: has a bun', 'Choked on a SECRET-CAUSE', 'home: a bathtub'])
  })

  test('causes and facts never reach the verifier call, so it cannot infer the declared effects', () => {
    const main = checkState(event)
    expect(main).not.toContain('SECRET-CAUSE')
    expect(main).not.toContain('has a bun')
  })

  test('they are checked in a second, parallel safety call', async () => {
    const states: string[] = []
    const evaluator = fakeEvaluator((s, q) => {
      states.push(s)
      return answersMatching(event, q)
    })
    await createJevChecker(evaluator).check(event)
    expect(evaluator.calls).toBe(2)
    expect(states.some((s) => s.includes('SECRET-CAUSE') && s.includes('has a bun'))).toBe(true)
  })

  test('an unsafe cause of death makes the event unsafe even when the narration is clean', async () => {
    const evaluator = fakeEvaluator((s, q) => {
      const a = answersMatching(event, q)
      return s.includes('SECRET-CAUSE') ? { ...a, safe: { type: 'boolean', probability: 0.1 } } : a
    })
    const result = await createJevChecker(evaluator).check(event)
    expect(result.judge.safe).toBe(false)
  })
})

describe('deterministic verifier mode (review finding 9)', () => {
  const config = { ...DEFAULT_CHECK_CONFIG, verifier: 'deterministic' as const }

  test('asks only the judge questions, so Jev still judges safety, tone and humor', () => {
    expect(Object.keys(buildCheckQuestions(makeEvent(), config)).sort()).toEqual(['funny', 'safe', 'tone'])
  })

  test('verification comes from the deterministic checks, not from Jev', async () => {
    const lying = makeEvent()
    lying.choices[1]!.outcome.narration = 'Then he dies.'
    const evaluator = fakeEvaluator((_s, q) => answersMatching(lying, q))
    const result = await createJevChecker(evaluator, config).check(lying)
    expect(result.verify.ok).toBe(false)
    expect(result.judge.safe).toBe(true)
  })
})

describe('deterministicVerify phrasing (final review, finding 2)', () => {
  const withText = (text: string) => {
    const e = makeEvent()
    e.choices[1]!.outcome.narration = text
    return e
  }

  test.each([
    'The Subject dies.',
    'You die.',
    'You are dead.',
    'The Subject is killed by a goose.',
    'You were killed by a goose.',
    'The Subject is now dead.',
    'The Subject drops dead.',
    'He passed away quietly.',
    'He drowned in the fountain.',
    'She choked to death on a bun.',
  ])('flags "%s" when no death effect is declared', (text) => {
    expect(deterministicVerify(withText(text)).ok).toBe(false)
  })

  test.each(['The Subject killed the mood.', 'The goose kills time.', 'A deadline looms.', 'He is dead serious about the bun.'])(
    'does not flag the idiom "%s"',
    (text) => {
      expect(deterministicVerify(withText(text)).ok).toBe(true)
    },
  )
})
