import type { Effect, Intensity, LifeState, Stat } from './types'

export interface EffectBudget {
  /** Largest absolute change to one non-money stat per event. */
  maxStatDelta: number
  /** Largest summed absolute change across non-money stats per event. */
  maxTotalStatDelta: number
  /** Money change cap is maxMoneyBase + maxMoneyShare * |current money|. */
  maxMoneyBase: number
  maxMoneyShare: number
  maxFactKey: number
  maxFactValue: number
  maxCause: number
}

export const DEFAULT_BUDGET: EffectBudget = {
  maxStatDelta: 30,
  maxTotalStatDelta: 50,
  maxMoneyBase: 1000,
  maxMoneyShare: 0.5,
  maxFactKey: 40,
  maxFactValue: 80,
  maxCause: 120,
}

const clampAbs = (n: number, max: number): number => Math.max(-max, Math.min(max, n))
const clamp100 = (n: number): number => Math.max(0, Math.min(100, n))

/**
 * Bounds model-proposed effects. Repeated effects on one stat are summed first,
 * so the budget applies to the event's net change, not to each effect. Out-of-budget
 * values are reduced, not rejected, so a slightly greedy event still plays.
 */
export function clampEffects(
  effects: readonly Effect[],
  state: LifeState,
  intensity: Intensity,
  budget: EffectBudget = DEFAULT_BUDGET,
): Effect[] {
  const net = new Map<Stat, number>()
  for (const e of effects) {
    if (e.kind === 'stat' && Number.isFinite(e.delta)) net.set(e.stat, (net.get(e.stat) ?? 0) + e.delta)
  }

  const out: Effect[] = []
  const emitted = new Set<Stat>()
  const deathAllowed = intensity === 3 || state.stage === 'elder'
  let statTotal = 0
  let deathUsed = false

  for (const e of effects) {
    if (e.kind === 'stat') {
      if (!net.has(e.stat) || emitted.has(e.stat)) continue
      emitted.add(e.stat)
      const sum = net.get(e.stat) as number
      let delta: number
      if (e.stat === 'money') {
        delta = Math.round(clampAbs(sum, budget.maxMoneyBase + budget.maxMoneyShare * Math.abs(state.stats.money)))
      } else {
        delta = Math.round(clampAbs(sum, budget.maxStatDelta))
        const room = Math.max(0, budget.maxTotalStatDelta - statTotal)
        delta = Math.sign(delta) * Math.min(Math.abs(delta), room)
        statTotal += Math.abs(delta)
      }
      if (delta !== 0) out.push({ kind: 'stat', stat: e.stat, delta })
    } else if (e.kind === 'fact') {
      const key = e.key.trim().slice(0, budget.maxFactKey)
      const value = e.value.trim().slice(0, budget.maxFactValue)
      if (key && value) out.push({ kind: 'fact', key, value })
    } else {
      if (deathUsed || !deathAllowed) continue
      deathUsed = true
      out.push({ kind: 'death', cause: e.cause.trim().slice(0, budget.maxCause) || 'Unspecified causes' })
    }
  }
  return out
}

/** Applies already-clamped effects. A dead character is never changed again. */
export function applyEffects(state: LifeState, effects: readonly Effect[]): LifeState {
  if (!state.alive) return state
  const stats = { ...state.stats }
  const facts = { ...state.facts }
  let alive: boolean = state.alive
  let causeOfDeath = state.causeOfDeath

  for (const e of effects) {
    if (e.kind === 'stat') {
      if (!Number.isFinite(e.delta)) continue
      stats[e.stat] = e.stat === 'money' ? stats.money + e.delta : clamp100(stats[e.stat] + e.delta)
    } else if (e.kind === 'fact') {
      facts[e.key] = e.value
    } else {
      alive = false
      causeOfDeath = e.cause
    }
  }
  return { ...state, stats, facts, alive, causeOfDeath }
}
