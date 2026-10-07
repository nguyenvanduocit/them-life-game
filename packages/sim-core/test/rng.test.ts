import { describe, expect, test } from 'bun:test'
import { createRng } from '../src/rng'

describe('createRng', () => {
  test('the same seed gives the same sequence', () => {
    const a = createRng(42)
    const b = createRng(42)
    expect([a.next(), a.next(), a.next()]).toEqual([b.next(), b.next(), b.next()])
  })

  test('different seeds give different sequences', () => {
    expect(createRng(1).next()).not.toBe(createRng(2).next())
  })

  test('int stays inside [0, max)', () => {
    const r = createRng(7)
    for (let i = 0; i < 1000; i++) {
      const n = r.int(5)
      expect(n).toBeGreaterThanOrEqual(0)
      expect(n).toBeLessThan(5)
    }
  })

  test('pick returns an item and throws on an empty list', () => {
    const r = createRng(3)
    expect(['a', 'b', 'c']).toContain(r.pick(['a', 'b', 'c']))
    expect(() => r.pick([])).toThrow('empty list')
  })
})
