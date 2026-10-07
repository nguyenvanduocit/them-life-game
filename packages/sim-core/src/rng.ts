export interface Rng {
  /** Uniform float in [0, 1). */
  next(): number
  /** Uniform integer in [0, maxExclusive). */
  int(maxExclusive: number): number
  pick<T>(items: readonly T[]): T
}

/** mulberry32: small, fast, seedable. Not for security. */
export function createRng(seed: number): Rng {
  let a = seed >>> 0
  const next = (): number => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return {
    next,
    int: (maxExclusive) => Math.floor(next() * maxExclusive),
    pick: (items) => {
      if (items.length === 0) throw new Error('Cannot pick from an empty list')
      return items[Math.floor(next() * items.length)] as (typeof items)[number]
    },
  }
}
