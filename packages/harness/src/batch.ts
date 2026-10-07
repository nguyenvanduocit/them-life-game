import { createPolicyDecider, createRng, DEFAULT_TRAITS, playQuickLife, type PipelineDeps, type QuickLifeResult } from '@stc/sim-core'

export interface BatchSummary {
  lives: number
  stillAlive: number
  meanDeathAge: number
  p10DeathAge: number
  p90DeathAge: number
  meanNotoriety: number
  /** Share of incidents served from the fallback pool. */
  fallbackShare: number
  /** Share of lives that ended before the final highlight. */
  earlyDeathShare: number
}

const percentile = (sorted: number[], p: number): number => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))] ?? 0

export function summarizeLives(results: readonly QuickLifeResult[]): BatchSummary {
  const ages = results.map((r) => r.final.age).sort((a, b) => a - b)
  const steps = results.flatMap((r) => r.steps)
  const mean = (xs: number[]) => (xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length)
  return {
    lives: results.length,
    stillAlive: results.filter((r) => r.final.alive).length,
    meanDeathAge: mean(ages),
    p10DeathAge: percentile(ages, 0.1),
    p90DeathAge: percentile(ages, 0.9),
    meanNotoriety: mean(results.map((r) => r.final.stats.notoriety)),
    fallbackShare: steps.length === 0 ? 0 : steps.filter((s) => s.result.source === 'fallback').length / steps.length,
    earlyDeathShare: results.length === 0 ? 0 : results.filter((r) => r.steps.at(-1)?.highlight.kind !== 'death').length / results.length,
  }
}

/** Plays `count` seeded lives with the given pipeline pieces and summarizes them. */
export async function runBatch(count: number, base: Omit<PipelineDeps, 'rng'>, seedStart = 0): Promise<BatchSummary> {
  const results: QuickLifeResult[] = []
  for (let i = 0; i < count; i++) {
    const seed = seedStart + i
    results.push(
      await playQuickLife({
        ...base,
        rng: createRng(seed),
        decider: createPolicyDecider(createRng(seed + 1)),
        traits: DEFAULT_TRAITS,
        tone: { name: 'standard', maxIntensity: 3 },
        name: `Subject ${seed}`,
        seed,
      }),
    )
  }
  return summarizeLives(results)
}
