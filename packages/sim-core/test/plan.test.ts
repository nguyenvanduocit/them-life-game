import { describe, expect, test } from 'bun:test'
import { planLife } from '../src/plan'

describe('planLife', () => {
  test('is deterministic for a seed', () => {
    expect(planLife(123)).toEqual(planLife(123))
  })

  test('always has 12 to 15 highlights plus one final death highlight, in stage order', () => {
    for (let seed = 0; seed < 300; seed++) {
      const plan = planLife(seed)
      const body = plan.slice(0, -1)
      expect(body.length).toBeGreaterThanOrEqual(12)
      expect(body.length).toBeLessThanOrEqual(15)
      expect(plan.at(-1)?.kind).toBe('death')
      expect(plan.map((h) => h.index)).toEqual(plan.map((_, i) => i))
      const order = ['child', 'teen', 'adult', 'elder']
      const stages = plan.map((h) => order.indexOf(h.stage))
      expect(stages).toEqual([...stages].sort((a, b) => a - b))
    }
  })

  test('ages strictly increase and every highlight age fits its stage', () => {
    for (let seed = 0; seed < 300; seed++) {
      const plan = planLife(seed)
      for (let i = 1; i < plan.length; i++) expect(plan[i]!.age).toBeGreaterThan(plan[i - 1]!.age)
    }
    const plan = planLife(9)
    for (const h of plan.filter((p) => p.kind !== 'death')) {
      if (h.stage === 'child') expect(h.age).toBeLessThanOrEqual(12)
      if (h.stage === 'teen') expect(h.age >= 13 && h.age <= 19).toBe(true)
      if (h.stage === 'adult') expect(h.age >= 20 && h.age <= 64).toBe(true)
      if (h.stage === 'elder') expect(h.age).toBeGreaterThanOrEqual(65)
    }
  })

  test('never repeats the same kind twice in a row', () => {
    for (let seed = 0; seed < 300; seed++) {
      const kinds = planLife(seed).slice(0, -1).map((h) => h.kind)
      for (let i = 1; i < kinds.length; i++) expect(kinds[i]).not.toBe(kinds[i - 1])
    }
  })
})
