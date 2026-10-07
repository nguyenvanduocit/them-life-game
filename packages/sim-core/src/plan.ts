import { createRng } from './rng'
import type { Stage } from './types'

export const HIGHLIGHT_KINDS = ['family', 'school', 'work', 'money', 'love', 'crime', 'health', 'luck', 'weird'] as const
export type HighlightKind = (typeof HIGHLIGHT_KINDS)[number] | 'death'

export interface Highlight {
  index: number
  kind: HighlightKind
  stage: Stage
  age: number
}

interface StagePlan {
  stage: Stage
  minCount: number
  maxCount: number
  firstAge: number
  lastAge: number
}

const STAGE_PLANS: readonly StagePlan[] = [
  { stage: 'child', minCount: 2, maxCount: 3, firstAge: 3, lastAge: 12 },
  { stage: 'teen', minCount: 3, maxCount: 3, firstAge: 13, lastAge: 19 },
  { stage: 'adult', minCount: 5, maxCount: 7, firstAge: 20, lastAge: 64 },
  { stage: 'elder', minCount: 2, maxCount: 2, firstAge: 65, lastAge: 90 },
]

/**
 * 12 to 15 highlight incidents across the life stages, then one final death
 * highlight. Ages strictly increase. Same seed, same plan.
 */
export function planLife(seed: number): Highlight[] {
  const rng = createRng(seed)
  const out: Highlight[] = []
  let previousKind: HighlightKind | null = null

  for (const plan of STAGE_PLANS) {
    const count = plan.minCount + rng.int(plan.maxCount - plan.minCount + 1)
    const span = plan.lastAge - plan.firstAge + 1
    for (let i = 0; i < count; i++) {
      const lo = plan.firstAge + Math.floor((i * span) / count)
      const hi = plan.firstAge + Math.floor(((i + 1) * span) / count) - 1
      const choices = HIGHLIGHT_KINDS.filter((k) => k !== previousKind)
      const kind = rng.pick(choices)
      previousKind = kind
      out.push({ index: out.length, kind, stage: plan.stage, age: lo + rng.int(hi - lo + 1) })
    }
  }

  const last = out[out.length - 1]
  const lastAge = last ? last.age : 65
  out.push({ index: out.length, kind: 'death', stage: 'elder', age: lastAge + 1 + rng.int(8) })
  return out
}
