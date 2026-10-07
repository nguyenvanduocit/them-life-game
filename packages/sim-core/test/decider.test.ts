import { describe, expect, test } from 'bun:test'
import { argmaxWithTies, createPolicyDecider, DEFAULT_TRAITS, policyScore } from '../src/decider'
import { createRng } from '../src/rng'
import { makeEvent, makeState } from './helpers'

describe('policyScore', () => {
  test('risky tracks recklessness, safe is its opposite', () => {
    const t = { ...DEFAULT_TRAITS, recklessness: 90 }
    expect(policyScore(['risky'], t)).toBe(90)
    expect(policyScore(['safe'], t)).toBe(10)
  })

  test('averages several tags and scores an untagged choice 50', () => {
    expect(policyScore(['greedy', 'kind'], { ...DEFAULT_TRAITS, greed: 100, kindness: 0 })).toBe(50)
    expect(policyScore([], DEFAULT_TRAITS)).toBe(50)
  })
})

describe('argmaxWithTies', () => {
  test('returns the highest id and throws when empty', () => {
    expect(argmaxWithTies({ a: 1, b: 3, c: 2 }, createRng(1))).toBe('b')
    expect(() => argmaxWithTies({}, createRng(1))).toThrow('No choices')
  })

  test('breaks ties deterministically for a seed', () => {
    const picks = (seed: number) => Array.from({ length: 5 }, () => argmaxWithTies({ a: 1, b: 1 }, createRng(seed)))
    expect(picks(7)).toEqual(picks(7))
    const seen = new Set(Array.from({ length: 40 }, (_, i) => argmaxWithTies({ a: 1, b: 1 }, createRng(i))))
    expect(seen).toEqual(new Set(['a', 'b']))
  })
})

describe('createPolicyDecider', () => {
  test('a chaotic character picks the chaotic choice, a cautious one the safe choice', async () => {
    const event = makeEvent() // c1 chaotic, c2 safe, c3 lazy
    const state = makeState()
    const decider = createPolicyDecider(createRng(1))
    expect(await decider.pick({ event, state, traits: { recklessness: 50, greed: 50, kindness: 50, chaos: 100 } })).toBe('c1')
    expect(await decider.pick({ event, state, traits: { recklessness: 0, greed: 50, kindness: 50, chaos: 50 } })).toBe('c2')
  })
})
