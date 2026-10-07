export interface Clock {
  now?: () => number
}

export type RateDecision = { allowed: true } | { allowed: false; retryAfterMs: number }

/** Sliding-window limiter per key. */
export function createRateLimiter(options: { max: number; windowMs: number } & Clock) {
  const now = options.now ?? Date.now
  const hits = new Map<string, number[]>()
  let lastPrune = now()

  return {
    /** Keys currently remembered. */
    get size(): number {
      return hits.size
    },
    check(key: string): RateDecision {
      const t = now()
      // Forget idle keys once per window so the map cannot grow without bound.
      if (t - lastPrune >= options.windowMs) {
        for (const [k, list] of hits) if ((list.at(-1) ?? 0) <= t - options.windowMs) hits.delete(k)
        lastPrune = t
      }
      const recent = (hits.get(key) ?? []).filter((h) => h > t - options.windowMs)
      if (recent.length >= options.max) {
        hits.set(key, recent)
        return { allowed: false, retryAfterMs: (recent[0] as number) + options.windowMs - t }
      }
      recent.push(t)
      hits.set(key, recent)
      return { allowed: true }
    },
  }
}

/** Calendar-day (UTC) request budget per key. */
export function createDailyBudget(options: { maxPerDay: number } & Clock) {
  const now = options.now ?? Date.now
  const days = new Map<string, { day: string; count: number }>()
  let currentDay = ''

  return {
    get size(): number {
      return days.size
    },
    /** Returns false when the key has used up today's budget. */
    consume(key: string): boolean {
      const day = new Date(now()).toISOString().slice(0, 10)
      if (day !== currentDay) {
        for (const [k, entry] of days) if (entry.day !== day) days.delete(k)
        currentDay = day
      }
      const entry = days.get(key)
      const count = entry && entry.day === day ? entry.count : 0
      if (count >= options.maxPerDay) return false
      days.set(key, { day, count: count + 1 })
      return true
    },
  }
}

/** Small LRU cache. */
export function createCache<T>(maxEntries = 500) {
  const map = new Map<string, T>()
  return {
    get(key: string): T | undefined {
      const value = map.get(key)
      if (value === undefined) return undefined
      map.delete(key)
      map.set(key, value)
      return value
    },
    set(key: string, value: T): void {
      map.delete(key)
      map.set(key, value)
      if (map.size > maxEntries) map.delete(map.keys().next().value as string)
    },
    get size(): number {
      return map.size
    },
  }
}
