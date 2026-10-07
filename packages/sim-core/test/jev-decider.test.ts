import { describe, expect, test } from 'bun:test'
import { createPolicyDecider, DEFAULT_TRAITS } from '../src/decider'
import { EvaluatorError } from '../src/evaluator'
import { createJevDecider } from '../src/jev-decider'
import { createRng } from '../src/rng'
import { fakeEvaluator } from './fakes'
import { makeEvent, makeState } from './helpers'

const context = { event: makeEvent(), state: makeState(), traits: DEFAULT_TRAITS }

describe('createJevDecider', () => {
  test('picks the choice with the highest probability', async () => {
    const evaluator = fakeEvaluator(() => ({ pick: { type: 'choice', choice: 'c3', probabilities: { c1: 0.2, c2: 0.1, c3: 0.7 } } }))
    const decider = createJevDecider(evaluator, createPolicyDecider(createRng(1)), createRng(1))
    expect(await decider.pick(context)).toBe('c3')
    expect(evaluator.calls).toBe(1)
  })

  test('uses the single chosen id when no distribution is returned', async () => {
    const evaluator = fakeEvaluator(() => ({ pick: { type: 'choice', choice: 'c2' } }))
    expect(await createJevDecider(evaluator, createPolicyDecider(createRng(1)), createRng(1)).pick(context)).toBe('c2')
  })

  test('falls back to the policy decider when Jev fails', async () => {
    const evaluator = fakeEvaluator(() => {
      throw new EvaluatorError('down')
    })
    const traits = { recklessness: 0, greed: 50, kindness: 50, chaos: 50 }
    const decider = createJevDecider(evaluator, createPolicyDecider(createRng(1)), createRng(1))
    expect(await decider.pick({ ...context, traits })).toBe('c2') // safe choice for a cautious character
  })

  test('falls back when Jev names an option that does not exist', async () => {
    const evaluator = fakeEvaluator(() => ({ pick: { type: 'choice', choice: 'c99' } }))
    const decider = createJevDecider(evaluator, createPolicyDecider(createRng(1)), createRng(1))
    const id = await decider.pick(context)
    expect(['c1', 'c2', 'c3']).toContain(id)
  })

  test('ignores probabilities for ids that are not choices', async () => {
    const evaluator = fakeEvaluator(() => ({ pick: { type: 'choice', choice: 'c1', probabilities: { c1: 0.4, ghost: 0.9 } } }))
    expect(await createJevDecider(evaluator, createPolicyDecider(createRng(1)), createRng(1)).pick(context)).toBe('c1')
  })

  test('a Jev call that never settles is abandoned after the timeout and the policy decides (review finding 2)', async () => {
    const evaluator = { evaluate: () => new Promise<never>(() => {}) }
    const traits = { recklessness: 0, greed: 50, kindness: 50, chaos: 50 }
    const decider = createJevDecider(evaluator, createPolicyDecider(createRng(1)), createRng(1), { timeoutMs: 30 })
    const started = Date.now()
    expect(await decider.pick({ ...context, traits })).toBe('c2')
    expect(Date.now() - started).toBeLessThan(1000)
  })
})
