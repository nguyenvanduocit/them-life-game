import { describe, expect, test } from 'bun:test'
import { applyEffects, clampEffects, DEFAULT_BUDGET } from '../src/effects'
import type { Effect } from '../src/types'
import { makeState } from './helpers'

const stat = (s: 'health' | 'happiness' | 'money' | 'notoriety', delta: number): Effect => ({ kind: 'stat', stat: s, delta })

describe('clampEffects', () => {
  test('caps a single stat delta at 30', () => {
    const out = clampEffects([stat('health', 90), stat('happiness', -90)], makeState(), 2)
    expect(out).toEqual([stat('health', 30), stat('happiness', -20)])
  })

  test('caps the summed absolute non-money deltas at 50', () => {
    const out = clampEffects([stat('health', 30), stat('happiness', 30), stat('notoriety', 30)], makeState(), 2)
    expect(out).toEqual([stat('health', 30), stat('happiness', 20)])
  })

  test('money delta cap is 1000 plus 50% of current absolute money', () => {
    expect(clampEffects([stat('money', 99999)], makeState({ stats: { health: 50, happiness: 50, money: 0, notoriety: 0 } }), 2)).toEqual([
      stat('money', 1000),
    ])
    expect(clampEffects([stat('money', -99999)], makeState({ stats: { health: 50, happiness: 50, money: 10000, notoriety: 0 } }), 2)).toEqual([
      stat('money', -6000),
    ])
  })

  test('drops NaN and Infinity deltas', () => {
    const out = clampEffects([stat('health', Number.NaN), stat('happiness', Number.POSITIVE_INFINITY), stat('notoriety', 5)], makeState(), 2)
    expect(out).toEqual([stat('notoriety', 5)])
  })

  test('death is dropped below intensity 3 for non-elders', () => {
    expect(clampEffects([{ kind: 'death', cause: 'Optimism' }], makeState({ stage: 'adult' }), 2)).toEqual([])
  })

  test('death is kept at intensity 3 and for elders, and only the first survives', () => {
    const two: Effect[] = [
      { kind: 'death', cause: 'Optimism' },
      { kind: 'death', cause: 'Also optimism' },
    ]
    expect(clampEffects(two, makeState({ stage: 'adult' }), 3)).toEqual([{ kind: 'death', cause: 'Optimism' }])
    expect(clampEffects(two, makeState({ stage: 'elder' }), 1)).toEqual([{ kind: 'death', cause: 'Optimism' }])
  })

  test('truncates fact keys and values and drops empty facts', () => {
    const out = clampEffects(
      [
        { kind: 'fact', key: 'k'.repeat(100), value: 'v'.repeat(200) },
        { kind: 'fact', key: '  ', value: 'x' },
        { kind: 'fact', key: 'ok', value: '   ' },
      ],
      makeState(),
      2,
    )
    expect(out).toEqual([{ kind: 'fact', key: 'k'.repeat(DEFAULT_BUDGET.maxFactKey), value: 'v'.repeat(DEFAULT_BUDGET.maxFactValue) }])
  })

  test('rounds fractional deltas', () => {
    expect(clampEffects([stat('health', 2.6)], makeState(), 2)).toEqual([stat('health', 3)])
  })
})

describe('applyEffects', () => {
  test('keeps non-money stats within 0..100 and lets money go negative', () => {
    const s = applyEffects(makeState(), [stat('health', 30), stat('health', 30), stat('happiness', -99), stat('money', -1000)])
    expect(s.stats.health).toBe(100)
    expect(s.stats.happiness).toBe(0)
    expect(s.stats.money).toBe(-788)
  })

  test('sets facts and records death with its cause', () => {
    const s = applyEffects(makeState(), [{ kind: 'fact', key: 'home', value: 'a bathtub' }, { kind: 'death', cause: 'Optimism' }])
    expect(s.facts.home).toBe('a bathtub')
    expect(s.alive).toBe(false)
    expect(s.causeOfDeath).toBe('Optimism')
  })

  test('a dead character is never changed again', () => {
    const dead = makeState({ alive: false, causeOfDeath: 'Optimism' })
    expect(applyEffects(dead, [stat('health', 10), { kind: 'death', cause: 'Again' }])).toBe(dead)
  })

  test('ignores non-finite deltas instead of poisoning a stat (final review, finding 3)', () => {
    const s = applyEffects(makeState(), [stat('health', Number.NaN), stat('money', Number.POSITIVE_INFINITY), stat('happiness', 5)])
    expect(s.stats).toEqual({ health: 64, happiness: 43, money: 212, notoriety: 21 })
  })

  test('does not mutate its input', () => {
    const before = makeState()
    const snapshot = structuredClone(before)
    applyEffects(before, [stat('health', 10), { kind: 'fact', key: 'a', value: 'b' }])
    expect(before).toEqual(snapshot)
  })
})

describe('clampEffects across repeated effects (review finding 1)', () => {
  test('the net change to one stat is capped, not each effect separately', () => {
    expect(clampEffects([stat('health', 30), stat('health', 20)], makeState(), 2)).toEqual([stat('health', 30)])
  })

  test('repeated effects on one stat are merged before the 50 total is applied', () => {
    expect(clampEffects([stat('health', 20), stat('happiness', 20), stat('health', 20)], makeState(), 2)).toEqual([stat('health', 30), stat('happiness', 20)])
  })

  test('money effects are summed before the money cap', () => {
    const eight = Array.from({ length: 8 }, () => stat('money', 1000))
    expect(clampEffects(eight, makeState({ stats: { health: 50, happiness: 50, money: 0, notoriety: 0 } }), 2)).toEqual([stat('money', 1000)])
  })

  test('opposite effects on one stat cancel before capping', () => {
    expect(clampEffects([stat('health', 20), stat('health', -20)], makeState(), 2)).toEqual([])
  })
})
