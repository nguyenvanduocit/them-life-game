import { EvaluatorError, type Answer, type Evaluator, type Question } from './evaluator'
import type { GeneratedEvent } from './types'

export interface CheckConfig {
  /** A boolean answer at or above this counts as yes; at or below 1 - threshold counts as no. */
  threshold: number
  /** The on-tone question passes at or above this probability. */
  toneThreshold: number
  /** The funny score (0 to 3) must reach this to count as funny enough. */
  minFunnyScore: number
  /**
   * Who verifies that the text agrees with the effects. 'deterministic' skips
   * Jev's per-choice questions and uses deterministicVerify; Jev still judges
   * safety, tone and humor. Use it when Jev misses the acceptance target.
   */
  verifier: 'jev' | 'deterministic'
}

export const DEFAULT_CHECK_CONFIG: CheckConfig = { threshold: 0.8, toneThreshold: 0.5, minFunnyScore: 2, verifier: 'jev' }

const SAFE_INSTRUCTIONS =
  'Is the whole scene free of sexual or abusive content involving minors, slurs against protected groups, and real named people or real brands?'

export interface VerifyResult {
  ok: boolean
  problems: string[]
}

export interface JudgeResult {
  safe: boolean
  onTone: boolean
  funnyScore: number
}

export interface CheckResult {
  verify: VerifyResult
  judge: JudgeResult
}

export interface EventChecker {
  /** Rejects with EvaluatorError when Jev cannot be trusted this time. */
  check(event: GeneratedEvent, signal?: AbortSignal): Promise<CheckResult>
}

/** What Jev sees: the text only, never the declared effects, so it cannot just agree with them. */
export function checkState(event: GeneratedEvent): string {
  return JSON.stringify({
    narration: event.narration,
    choices: event.choices.map((c) => ({ id: c.id, label: c.label, outcome: c.outcome.narration })),
  })
}

/**
 * Strings the player will see that are not part of the outcome narration:
 * causes of death (shown on the autopsy card) and facts (shown on the facts screen).
 * They are checked in their own call so the verifier never sees them.
 */
export function shownText(event: GeneratedEvent): string[] {
  const out = new Set<string>()
  for (const c of event.choices) {
    for (const e of c.outcome.effects) {
      if (e.kind === 'death') out.add(e.cause)
      else if (e.kind === 'fact') out.add(`${e.key}: ${e.value}`)
    }
  }
  return [...out]
}

export function buildCheckQuestions(event: GeneratedEvent, config: CheckConfig = DEFAULT_CHECK_CONFIG): Record<string, Question> {
  const questions: Record<string, Question> = {
    safe: { type: 'boolean', instructions: SAFE_INSTRUCTIONS },
    tone: {
      type: 'boolean',
      instructions: 'Is this a crude, darkly absurd comedy scene written in a deadpan, clinical voice?',
    },
    funny: {
      type: 'score',
      instructions: 'How funny is this scene for adults who enjoy crude, absurd humor?',
      criteria: ['not funny', 'mildly funny', 'funny', 'very funny'],
    },
  }
  if (config.verifier === 'deterministic') return questions
  for (const c of event.choices) {
    questions[`death:${c.id}`] = { type: 'boolean', instructions: `In the outcome of choice "${c.id}", does the text say or clearly imply that the character dies?` }
    questions[`loss:${c.id}`] = { type: 'boolean', instructions: `In the outcome of choice "${c.id}", does the text say the character loses or pays money?` }
    questions[`gain:${c.id}`] = { type: 'boolean', instructions: `In the outcome of choice "${c.id}", does the text say the character gains or finds money?` }
  }
  return questions
}

function boolAnswer(answers: Record<string, Answer>, id: string): number {
  const a = answers[id]
  if (!a || a.type !== 'boolean') throw new EvaluatorError(`Missing boolean answer for "${id}"`)
  return a.probability
}

/** Pure: compares what the text says (Jev's answers) with what the effects declare. */
export function readCheckAnswers(event: GeneratedEvent, answers: Record<string, Answer>, config: CheckConfig = DEFAULT_CHECK_CONFIG): CheckResult {
  const yes = (p: number) => p >= config.threshold
  const no = (p: number) => p <= 1 - config.threshold
  const problems: string[] = []

  for (const c of config.verifier === 'jev' ? event.choices : []) {
    const declaredDeath = c.outcome.effects.some((e) => e.kind === 'death')
    const money = c.outcome.effects.reduce((sum, e) => (e.kind === 'stat' && e.stat === 'money' ? sum + e.delta : sum), 0)
    const death = boolAnswer(answers, `death:${c.id}`)
    const loss = boolAnswer(answers, `loss:${c.id}`)
    const gain = boolAnswer(answers, `gain:${c.id}`)

    if (yes(death) && !declaredDeath) problems.push(`${c.id}: text says the character dies but no death effect is declared`)
    if (declaredDeath && no(death)) problems.push(`${c.id}: a death effect is declared but the text does not say the character dies`)
    if (yes(loss) && money >= 0) problems.push(`${c.id}: text says money is lost but no money loss is declared`)
    if (money < 0 && no(loss)) problems.push(`${c.id}: a money loss is declared but the text does not say money is lost`)
    if (yes(gain) && money <= 0) problems.push(`${c.id}: text says money is gained but no money gain is declared`)
    if (money > 0 && no(gain)) problems.push(`${c.id}: a money gain is declared but the text does not say money is gained`)
  }

  const funny = answers.funny
  if (!funny || funny.type !== 'score') throw new EvaluatorError('Missing score answer for "funny"')

  return {
    verify: config.verifier === 'jev' ? { ok: problems.length === 0, problems } : deterministicVerify(event),
    judge: {
      safe: yes(boolAnswer(answers, 'safe')),
      onTone: boolAnswer(answers, 'tone') >= config.toneThreshold,
      funnyScore: funny.score,
    },
  }
}

/**
 * Verifier and judge in one batched Jev call on the narration, plus a second
 * safety-only call, run in parallel, on the causes of death and facts the
 * player will also see. The second call is skipped when there are none.
 */
export function createJevChecker(evaluator: Evaluator, config: CheckConfig = DEFAULT_CHECK_CONFIG): EventChecker {
  return {
    async check(event, signal) {
      const shown = shownText(event)
      const [answers, extra] = await Promise.all([
        evaluator.evaluate(checkState(event), buildCheckQuestions(event, config), signal),
        shown.length > 0
          ? evaluator.evaluate(JSON.stringify({ alsoShownToThePlayer: shown }), { safe: { type: 'boolean', instructions: SAFE_INSTRUCTIONS } }, signal)
          : Promise.resolve(null),
      ])
      const result = readCheckAnswers(event, answers, config)
      if (extra && boolAnswer(extra, 'safe') < config.threshold) result.judge.safe = false
      return result
    },
  }
}

const DEATH_WORDS = /\b(dies|died|is dead|was killed|kills? (him|her|you|them)|passes away|passed away)\b/i

/**
 * Network-free verifier used when Jev is down. It only catches the dangerous
 * direction, text that kills the character without a death effect.
 */
export function deterministicVerify(event: GeneratedEvent): VerifyResult {
  const problems: string[] = []
  for (const c of event.choices) {
    const declaredDeath = c.outcome.effects.some((e) => e.kind === 'death')
    if (DEATH_WORDS.test(c.outcome.narration) && !declaredDeath) problems.push(`${c.id}: text says the character dies but no death effect is declared`)
  }
  return { ok: problems.length === 0, problems }
}
