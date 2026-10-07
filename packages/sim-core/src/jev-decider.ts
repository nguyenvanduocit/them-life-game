import { argmaxWithTies, type Decider } from './decider'
import { EvaluatorError, type Evaluator } from './evaluator'
import type { Rng } from './rng'
import { callWithDeadline } from './timeout'

/**
 * Offline decider backed by Jev. It asks one "choice" question and takes the
 * most probable option. Any failure hands the decision to the fallback decider.
 */
export function createJevDecider(evaluator: Evaluator, fallback: Decider, rng: Rng, options: { timeoutMs?: number } = {}): Decider {
  const timeoutMs = options.timeoutMs ?? 8000
  return {
    async pick(context, signal) {
      try {
        const criteria = Object.fromEntries(context.event.choices.map((c) => [c.id, c.label]))
        const state = JSON.stringify({
          situation: context.event.narration,
          character: { name: context.state.name, age: context.state.age, facts: context.state.facts },
          traits: context.traits,
        })
        const questions = {
          pick: {
            type: 'choice' as const,
            instructions: 'Which option would this character, given these personality traits on a scale of 0 to 100, most likely choose?',
            criteria,
          },
        }
        const answers = await callWithDeadline((s) => evaluator.evaluate(state, questions, s), timeoutMs, signal)
        const answer = answers.pick
        if (!answer || answer.type !== 'choice' || !(answer.choice in criteria)) {
          throw new EvaluatorError('Jev chose an option that does not exist')
        }
        const probabilities = answer.probabilities ?? { [answer.choice]: 1 }
        const scores: Record<string, number> = {}
        for (const id of Object.keys(criteria)) scores[id] = probabilities[id] ?? 0
        return argmaxWithTies(scores, rng)
      } catch {
        return fallback.pick(context, signal)
      }
    },
  }
}
