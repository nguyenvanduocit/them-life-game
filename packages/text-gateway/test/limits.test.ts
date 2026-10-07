import { describe, expect, test } from 'bun:test'
import { createCache, createDailyBudget, createRateLimiter } from '../src/limits'

describe('createRateLimiter', () => {
  test('allows max requests per window, then reports when to retry', () => {
    let t = 0
    const limiter = createRateLimiter({ max: 2, windowMs: 1000, now: () => t })
    expect(limiter.check('a')).toEqual({ allowed: true })
    t = 100
    expect(limiter.check('a')).toEqual({ allowed: true })
    t = 200
    expect(limiter.check('a')).toEqual({ allowed: false, retryAfterMs: 800 })
  })

  test('opens again once the window has passed and keeps keys separate', () => {
    let t = 0
    const limiter = createRateLimiter({ max: 1, windowMs: 1000, now: () => t })
    limiter.check('a')
    expect(limiter.check('b')).toEqual({ allowed: true })
    expect(limiter.check('a').allowed).toBe(false)
    t = 1001
    expect(limiter.check('a')).toEqual({ allowed: true })
  })
})

describe('createDailyBudget', () => {
  test('refuses after maxPerDay and resets on the next UTC day', () => {
    let t = Date.parse('2026-10-06T10:00:00Z')
    const budget = createDailyBudget({ maxPerDay: 2, now: () => t })
    expect([budget.consume('a'), budget.consume('a'), budget.consume('a')]).toEqual([true, true, false])
    expect(budget.consume('b')).toBe(true)
    t = Date.parse('2026-10-07T00:00:01Z')
    expect(budget.consume('a')).toBe(true)
  })
})

describe('createCache', () => {
  test('evicts the least recently used entry', () => {
    const cache = createCache<number>(2)
    cache.set('a', 1)
    cache.set('b', 2)
    cache.get('a')
    cache.set('c', 3)
    expect(cache.get('b')).toBeUndefined()
    expect(cache.get('a')).toBe(1)
    expect(cache.size).toBe(2)
  })
})

describe('memory stays bounded (review finding 5)', () => {
  test('the rate limiter forgets idle keys once per window', () => {
    let t = 0
    const limiter = createRateLimiter({ max: 5, windowMs: 1000, now: () => t })
    for (let i = 0; i < 50; i++) limiter.check(`key-${i}`)
    expect(limiter.size).toBe(50)
    t = 1500
    limiter.check('fresh')
    expect(limiter.size).toBe(1)
  })

  test('the daily budget drops yesterday\'s keys when the day changes', () => {
    let t = Date.parse('2026-10-06T10:00:00Z')
    const budget = createDailyBudget({ maxPerDay: 5, now: () => t })
    for (let i = 0; i < 20; i++) budget.consume(`key-${i}`)
    expect(budget.size).toBe(20)
    t = Date.parse('2026-10-07T01:00:00Z')
    budget.consume('today')
    expect(budget.size).toBe(1)
  })
})
