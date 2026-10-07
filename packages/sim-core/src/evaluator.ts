import { experimental_decide } from 'ai'
import { z } from 'zod'

/**
 * Jev, the evaluation model, answers typed questions about one shared state.
 * These types mirror the three question kinds of the AI SDK's experimental_decide.
 */
export type Question =
  | { type: 'boolean'; instructions: string }
  | { type: 'choice'; instructions: string; criteria: Record<string, string> }
  | { type: 'score'; instructions: string; criteria: string[] }

export type Answer =
  | { type: 'boolean'; probability: number }
  | { type: 'choice'; choice: string; probabilities?: Record<string, number> }
  | { type: 'score'; score: number }

export interface Evaluator {
  /** One batched call. Rejects when the service is unreachable or answers malformed. */
  evaluate(state: string, questions: Record<string, Question>, signal?: AbortSignal): Promise<Record<string, Answer>>
}

export class EvaluatorError extends Error {}

const answerSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('boolean'), probability: z.number().min(0).max(1) }),
  z.object({ type: z.literal('choice'), choice: z.string(), probabilities: z.record(z.string(), z.number()).optional() }),
  z.object({ type: z.literal('score'), score: z.number() }),
])

/** The call shape of experimental_decide that this module depends on. Injectable for tests. */
export type DecideFn = (options: {
  model: string
  state: string
  questions: Record<string, Question>
  abortSignal?: AbortSignal
}) => Promise<{ answers: Record<string, unknown> }>

const liveDecide: DecideFn = async (options) => {
  const result = await experimental_decide(options)
  return { answers: result.answers as Record<string, unknown> }
}

export interface JevEvaluatorOptions {
  /** Model id resolved by the AI SDK's configured provider. */
  model?: string
  decide?: DecideFn
}

/**
 * The real transport. Every answer is validated, and any problem becomes an
 * EvaluatorError so callers can fall back instead of trusting garbage.
 */
export function createJevEvaluator(options: JevEvaluatorOptions = {}): Evaluator {
  const model = options.model ?? 'typesafe-ai/jev'
  const decide = options.decide ?? liveDecide
  return {
    async evaluate(state, questions, signal) {
      let raw: Record<string, unknown>
      try {
        raw = (await decide({ model, state, questions, abortSignal: signal })).answers
      } catch (cause) {
        throw new EvaluatorError(`Evaluator call failed: ${cause instanceof Error ? cause.message : String(cause)}`)
      }
      const out: Record<string, Answer> = {}
      for (const [id, question] of Object.entries(questions)) {
        const parsed = answerSchema.safeParse(raw[id])
        const matches =
          parsed.success &&
          parsed.data.type === question.type &&
          (parsed.data.type !== 'choice' || (question.type === 'choice' && parsed.data.choice in question.criteria)) &&
          (parsed.data.type !== 'score' || (question.type === 'score' && parsed.data.score >= 0 && parsed.data.score <= question.criteria.length - 1))
        if (!parsed.success || !matches) throw new EvaluatorError(`Evaluator returned a malformed answer for "${id}"`)
        out[id] = parsed.data
      }
      return out
    },
  }
}
