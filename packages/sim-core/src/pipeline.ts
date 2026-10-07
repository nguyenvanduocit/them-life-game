import { DEFAULT_CHECK_CONFIG, deterministicVerify, type CheckConfig, type CheckResult, type EventChecker } from './checks'
import { clampEffects, DEFAULT_BUDGET, type EffectBudget } from './effects'
import { pickFallback } from './fallback'
import type { Rng } from './rng'
import { callWithDeadline } from './timeout'
import { generatedEventSchema, type EventRequest, type TextSource } from './text-source'
import type { GeneratedEvent, LifeState } from './types'

export interface PipelineDeps {
  text: TextSource
  /** null means no Jev at all: nothing is judged for safety or tone. For development and tests only; to run without Jev's verifier use CheckConfig.verifier = 'deterministic'. */
  checker: EventChecker | null
  rng: Rng
  budget?: EffectBudget
  config?: CheckConfig
  /** Total tries including the first. Default 3. */
  maxAttempts?: number
  /** Per external call. Default 8000. */
  timeoutMs?: number
}

export interface PipelineResult {
  event: GeneratedEvent
  source: 'ai' | 'fallback'
  attempts: number
  /** Why earlier attempts were rejected, for logs and the harness. */
  notes: string[]
  funnyScore: number | null
}

const message = (e: unknown): string => (e instanceof Error ? e.message : String(e))

function clampEvent(event: GeneratedEvent, state: LifeState, budget: EffectBudget): GeneratedEvent {
  return {
    ...event,
    choices: event.choices.map((c) => ({
      ...c,
      outcome: { ...c.outcome, effects: clampEffects(c.outcome.effects, state, event.intensity, budget) },
    })),
  }
}

/**
 * generate, validate, clamp, check, retry, and finally fall back to the
 * authored pool. Never rejects because of the model or Jev; it rejects only
 * when the caller aborts.
 */
export async function produceEvent(deps: PipelineDeps, request: EventRequest, state: LifeState, signal?: AbortSignal): Promise<PipelineResult> {
  const budget = deps.budget ?? DEFAULT_BUDGET
  const config = deps.config ?? DEFAULT_CHECK_CONFIG
  const maxAttempts = deps.maxAttempts ?? 3
  const timeoutMs = deps.timeoutMs ?? 8000
  const notes: string[] = []
  let attempts = 0
  let funnyRegens = 0
  let best: { event: GeneratedEvent; funny: number } | null = null

  const fallback = (): PipelineResult => ({ event: pickFallback(deps.rng), source: 'fallback', attempts, notes, funnyScore: null })

  while (attempts < maxAttempts) {
    signal?.throwIfAborted()
    const attempt = attempts
    attempts++

    let raw: unknown
    try {
      raw = await callWithDeadline((s) => deps.text.generate({ ...request, attempt }, s), timeoutMs, signal)
    } catch (e) {
      signal?.throwIfAborted()
      notes.push(`attempt ${attempt}: text source failed: ${message(e)}`)
      continue
    }

    const parsed = generatedEventSchema.safeParse(raw)
    if (!parsed.success) {
      notes.push(`attempt ${attempt}: invalid event`)
      continue
    }
    if (parsed.data.intensity > request.tone.maxIntensity) {
      notes.push(`attempt ${attempt}: intensity ${parsed.data.intensity} is above the tone limit ${request.tone.maxIntensity}`)
      continue
    }
    const event = clampEvent(parsed.data, state, budget)

    if (!deps.checker) {
      const verdict = deterministicVerify(event)
      if (!verdict.ok) {
        notes.push(`attempt ${attempt}: ${verdict.problems.join('; ')}`)
        continue
      }
      return { event, source: 'ai', attempts, notes, funnyScore: null }
    }

    let result: CheckResult
    try {
      result = await callWithDeadline((s) => deps.checker!.check(event, s), timeoutMs, signal)
    } catch (e) {
      signal?.throwIfAborted()
      notes.push(`attempt ${attempt}: judge unavailable: ${message(e)}`)
      return fallback()
    }

    if (!result.verify.ok) {
      notes.push(`attempt ${attempt}: ${result.verify.problems.join('; ')}`)
      continue
    }
    if (!result.judge.safe) {
      notes.push(`attempt ${attempt}: failed the safety check`)
      continue
    }
    if (!result.judge.onTone) {
      notes.push(`attempt ${attempt}: off tone`)
      continue
    }
    if (result.judge.funnyScore >= config.minFunnyScore) {
      return { event, source: 'ai', attempts, notes, funnyScore: result.judge.funnyScore }
    }

    notes.push(`attempt ${attempt}: funny score ${result.judge.funnyScore} is below ${config.minFunnyScore}`)
    if (!best || result.judge.funnyScore > best.funny) best = { event, funny: result.judge.funnyScore }
    if (funnyRegens >= 1) break
    funnyRegens++
  }

  if (best) return { event: best.event, source: 'ai', attempts, notes, funnyScore: best.funny }
  return fallback()
}
