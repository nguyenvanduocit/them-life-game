import type { Answer, Evaluator, Question } from '../src/evaluator'
import type { GeneratedEvent } from '../src/types'

/** Default answers for every question buildCheckQuestions asks: safe, on tone, funny, and nothing described in the text. */
export function benignAnswers(questions: Record<string, Question>, over: Record<string, Answer> = {}): Record<string, Answer> {
  const out: Record<string, Answer> = {}
  for (const [id, q] of Object.entries(questions)) {
    if (q.type === 'score') out[id] = { type: 'score', score: 3 }
    else if (q.type === 'choice') out[id] = { type: 'choice', choice: Object.keys(q.criteria)[0] as string }
    else if (id === 'safe') out[id] = { type: 'boolean', probability: 0.97 }
    else if (id === 'tone') out[id] = { type: 'boolean', probability: 0.9 }
    else out[id] = { type: 'boolean', probability: 0.02 }
  }
  return { ...out, ...over }
}

export function fakeEvaluator(handler: (state: string, questions: Record<string, Question>) => Record<string, Answer> | Promise<Record<string, Answer>>): Evaluator & { calls: number } {
  const evaluator = {
    calls: 0,
    async evaluate(state: string, questions: Record<string, Question>) {
      evaluator.calls++
      return handler(state, questions)
    },
  }
  return evaluator
}

/** Answers that agree with the event's declared effects, so a check passes cleanly. */
export function answersMatching(event: GeneratedEvent, questions: Record<string, Question>): Record<string, Answer> {
  const over: Record<string, Answer> = {}
  for (const c of event.choices) {
    const money = c.outcome.effects.reduce((sum, e) => (e.kind === 'stat' && e.stat === 'money' ? sum + e.delta : sum), 0)
    over[`death:${c.id}`] = { type: 'boolean', probability: c.outcome.effects.some((e) => e.kind === 'death') ? 0.97 : 0.02 }
    over[`loss:${c.id}`] = { type: 'boolean', probability: money < 0 ? 0.97 : 0.02 }
    over[`gain:${c.id}`] = { type: 'boolean', probability: money > 0 ? 0.97 : 0.02 }
  }
  return benignAnswers(questions, over)
}
