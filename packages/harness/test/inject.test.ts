import { describe, expect, test } from 'bun:test'
import { createRng, deterministicVerify, type GeneratedEvent } from '@stc/sim-core'
import { buildLabeledSet, CONTRADICTION_KINDS, injectContradiction } from '../src/inject'

const base = (): GeneratedEvent => ({
  narration: 'A pigeon files a complaint.',
  intensity: 2,
  choices: [
    { id: 'c1', label: 'Read it.', tags: ['kind'], outcome: { narration: 'It is in pigeon.', effects: [{ kind: 'stat', stat: 'money', delta: -20 }, { kind: 'death', cause: 'Boredom' }] } },
    { id: 'c2', label: 'Ignore it.', tags: ['lazy'], outcome: { narration: 'It files another.', effects: [] } },
  ],
})

describe('injectContradiction', () => {
  test('never mutates its input', () => {
    const e = base()
    const before = structuredClone(e)
    for (const k of CONTRADICTION_KINDS) injectContradiction(e, k)
    expect(e).toEqual(before)
  })

  test('text-kills adds a death sentence and removes the death effect, which the deterministic verifier catches', () => {
    const out = injectContradiction(base(), 'text-kills')
    expect(out.choices[0]!.outcome.narration).toContain('Then he dies.')
    expect(out.choices[0]!.outcome.effects.some((e) => e.kind === 'death')).toBe(false)
    expect(deterministicVerify(out).ok).toBe(false)
  })

  test('death-unmentioned declares a death the text never mentions', () => {
    const e = base()
    e.choices[0]!.outcome.effects = []
    const out = injectContradiction(e, 'death-unmentioned')
    expect(out.choices[0]!.outcome.effects).toEqual([{ kind: 'death', cause: 'Unspecified causes' }])
  })

  test('money kinds add a money sentence and drop money effects', () => {
    const lost = injectContradiction(base(), 'money-lost-unstated')
    expect(lost.choices[0]!.outcome.narration).toContain('$50')
    expect(lost.choices[0]!.outcome.effects.some((e) => e.kind === 'stat' && e.stat === 'money')).toBe(false)
    const gain = injectContradiction(base(), 'money-gain-unstated')
    expect(gain.choices[0]!.outcome.narration).toContain('$80')
  })
})

describe('buildLabeledSet', () => {
  const events = Array.from({ length: 101 }, (_, i) => ({ ...base(), narration: `event ${i}` }))

  test('labels half (rounded down) as contradictions and keeps the rest clean', () => {
    const set = buildLabeledSet(events, createRng(1))
    expect(set).toHaveLength(101)
    expect(set.filter((s) => s.contradicts)).toHaveLength(50)
    expect(set.filter((s) => s.contradicts).every((s) => s.kind !== undefined)).toBe(true)
  })

  test('is reproducible for a seed and different for another', () => {
    const a = buildLabeledSet(events, createRng(1)).map((s) => s.event.narration)
    expect(buildLabeledSet(events, createRng(1)).map((s) => s.event.narration)).toEqual(a)
    expect(buildLabeledSet(events, createRng(2)).map((s) => s.event.narration)).not.toEqual(a)
  })

  test('handles an empty list', () => {
    expect(buildLabeledSet([], createRng(1))).toEqual([])
  })
})
