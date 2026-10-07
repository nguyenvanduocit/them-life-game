import type { EventChecker } from '@stc/sim-core'
import type { LabeledEvent } from './inject'

export interface AcceptanceResult {
  total: number
  truePositives: number
  falseNegatives: number
  falsePositives: number
  trueNegatives: number
  /** Share of injected contradictions that were flagged. */
  recall: number
  /** Share of clean events that were wrongly flagged. */
  falsePositiveRate: number
  /** Events where the checker itself failed (counted as not flagged, and reported). */
  checkerErrors: number
}

export interface AcceptanceTarget {
  minRecall: number
  maxFalsePositiveRate: number
}

/** The spec's starting proposal: flag at least 90% of contradictions with at most 10% false positives. */
export const DEFAULT_TARGET: AcceptanceTarget = { minRecall: 0.9, maxFalsePositiveRate: 0.1 }

export async function runVerifierAcceptance(checker: EventChecker, set: readonly LabeledEvent[]): Promise<AcceptanceResult> {
  let tp = 0
  let fn = 0
  let fp = 0
  let tn = 0
  let errors = 0
  for (const item of set) {
    let flagged = false
    try {
      flagged = !(await checker.check(item.event)).verify.ok
    } catch {
      errors++
      continue // no answer to count either way
    }
    if (item.contradicts) flagged ? tp++ : fn++
    else flagged ? fp++ : tn++
  }
  return {
    total: set.length,
    truePositives: tp,
    falseNegatives: fn,
    falsePositives: fp,
    trueNegatives: tn,
    recall: tp + fn === 0 ? 0 : tp / (tp + fn),
    falsePositiveRate: fp + tn === 0 ? 0 : fp / (fp + tn),
    checkerErrors: errors,
  }
}

export function meetsTarget(result: AcceptanceResult, target: AcceptanceTarget = DEFAULT_TARGET): boolean {
  return result.checkerErrors === 0 && result.recall >= target.minRecall && result.falsePositiveRate <= target.maxFalsePositiveRate
}
