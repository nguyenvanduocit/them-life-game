import { describe, expect, test } from 'bun:test'
import { createJevEvaluator, EvaluatorError, type DecideFn, type Question } from '../src/evaluator'

const questions: Record<string, Question> = {
  a: { type: 'boolean', instructions: 'Is it?' },
  b: { type: 'score', instructions: 'How much?', criteria: ['low', 'high'] },
}

describe('createJevEvaluator', () => {
  test('returns validated answers and sends the default model id', async () => {
    let seenModel = ''
    const decide: DecideFn = async (o) => {
      seenModel = o.model
      return { answers: { a: { type: 'boolean', probability: 0.9 }, b: { type: 'score', score: 1 } } }
    }
    const answers = await createJevEvaluator({ decide }).evaluate('state', questions)
    expect(answers).toEqual({ a: { type: 'boolean', probability: 0.9 }, b: { type: 'score', score: 1 } })
    expect(seenModel).toBe('typesafe-ai/jev')
  })

  test('wraps a failing call in EvaluatorError', async () => {
    const decide: DecideFn = async () => {
      throw new Error('503')
    }
    await expect(createJevEvaluator({ decide }).evaluate('s', questions)).rejects.toThrow(EvaluatorError)
  })

  test('rejects a probability outside 0..1', async () => {
    const decide: DecideFn = async () => ({ answers: { a: { type: 'boolean', probability: 1.5 }, b: { type: 'score', score: 1 } } })
    await expect(createJevEvaluator({ decide }).evaluate('s', questions)).rejects.toThrow('malformed answer for "a"')
  })

  test('rejects a missing answer and an answer of the wrong type', async () => {
    const missing: DecideFn = async () => ({ answers: { a: { type: 'boolean', probability: 0.5 } } })
    await expect(createJevEvaluator({ decide: missing }).evaluate('s', questions)).rejects.toThrow('"b"')
    const wrong: DecideFn = async () => ({ answers: { a: { type: 'score', score: 1 }, b: { type: 'score', score: 1 } } })
    await expect(createJevEvaluator({ decide: wrong }).evaluate('s', questions)).rejects.toThrow('"a"')
  })

  test('rejects a choice answer that names an option outside the criteria', async () => {
    const q: Record<string, Question> = { pick: { type: 'choice', instructions: 'Which?', criteria: { x: 'ex', y: 'why' } } }
    const decide: DecideFn = async () => ({ answers: { pick: { type: 'choice', choice: 'z' } } })
    await expect(createJevEvaluator({ decide }).evaluate('s', q)).rejects.toThrow('"pick"')
  })
})

// Live smoke test. Run with JEV_LIVE=1 and AI Gateway credentials configured.
describe.skipIf(!process.env.JEV_LIVE)('live Jev', () => {
  test('answers a boolean question with a probability', async () => {
    const answers = await createJevEvaluator().evaluate('The sky is blue.', { q: { type: 'boolean', instructions: 'Is the sky blue?' } })
    expect(answers.q?.type).toBe('boolean')
  })
})

describe('score range (review finding 8)', () => {
  const scoreQuestion: Record<string, Question> = { f: { type: 'score', instructions: 'How funny?', criteria: ['no', 'a bit', 'yes', 'very'] } }
  const answerWith = (score: number): DecideFn => async () => ({ answers: { f: { type: 'score', score } } })

  test('a score outside 0..levels-1 is malformed', async () => {
    for (const score of [99, -5, 3.5]) {
      await expect(createJevEvaluator({ decide: answerWith(score) }).evaluate('s', scoreQuestion)).rejects.toThrow('"f"')
    }
  })

  test('scores at the ends of the scale are accepted', async () => {
    for (const score of [0, 1.5, 3]) {
      expect((await createJevEvaluator({ decide: answerWith(score) }).evaluate('s', scoreQuestion)).f).toEqual({ type: 'score', score })
    }
  })
})
