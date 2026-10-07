import { describe, expect, test } from 'bun:test'
import { lifeState, newLife, stageForAge, stepLife } from '../src/life-machine'
import { loadLife, saveLife } from '../src/persist'
import type { Outcome } from '../src/types'

const outcome = (over: Partial<Outcome> = {}): Outcome => ({ narration: 'Something happened.', effects: [], ...over })

describe('life machine', () => {
  test('starts as a living child with default stats', () => {
    const s = newLife({ name: 'Gary Pembrook' })
    expect(s.value).toBe('child')
    expect(lifeState(s)).toMatchObject({ name: 'Gary Pembrook', age: 0, stage: 'child', alive: true })
  })

  test('maps ages to stages at the boundaries', () => {
    expect([0, 12, 13, 19, 20, 64, 65, 99].map(stageForAge)).toEqual(['child', 'child', 'teen', 'teen', 'adult', 'adult', 'elder', 'elder'])
  })

  test('SKIP moves through stages, including jumping several at once', () => {
    let s = newLife({ name: 'G' })
    s = stepLife(s, { type: 'SKIP', toAge: 15 })
    expect([s.value, lifeState(s).stage]).toEqual(['teen', 'teen'])
    s = stepLife(s, { type: 'SKIP', toAge: 70 })
    expect([s.value, lifeState(s).stage, lifeState(s).age]).toEqual(['elder', 'elder', 70])
  })

  test('SKIP never moves age backwards', () => {
    let s = stepLife(newLife({ name: 'G' }), { type: 'SKIP', toAge: 40 })
    s = stepLife(s, { type: 'SKIP', toAge: 10 })
    expect(lifeState(s).age).toBe(40)
  })

  test('OUTCOME applies effects and appends a log entry', () => {
    let s = newLife({ name: 'G' })
    s = stepLife(s, {
      type: 'OUTCOME',
      atAge: 5,
      outcome: outcome({ narration: 'Left the cheese on a bus.', effects: [{ kind: 'stat', stat: 'happiness', delta: -10 }, { kind: 'fact', key: 'cheese', value: 'lost' }] }),
    })
    const c = lifeState(s)
    expect(c.stats.happiness).toBe(40)
    expect(c.facts.cheese).toBe('lost')
    expect(c.log).toEqual([{ age: 5, text: 'Left the cheese on a bus.', tags: [] }])
  })

  test('a death effect ends the life with its cause', () => {
    let s = stepLife(newLife({ name: 'G' }), { type: 'SKIP', toAge: 71 })
    s = stepLife(s, { type: 'OUTCOME', atAge: 71, outcome: outcome({ effects: [{ kind: 'death', cause: 'Optimism' }] }) })
    expect(s.value).toBe('dead')
    expect(s.status).toBe('done')
    expect(lifeState(s)).toMatchObject({ alive: false, causeOfDeath: 'Optimism' })
  })

  test('a dead life ignores every later event', () => {
    let s = stepLife(newLife({ name: 'G' }), { type: 'OUTCOME', atAge: 1, outcome: outcome({ effects: [{ kind: 'death', cause: 'Optimism' }] }) })
    const before = lifeState(s)
    s = stepLife(s, { type: 'SKIP', toAge: 50 })
    s = stepLife(s, { type: 'OUTCOME', atAge: 50, outcome: outcome({ effects: [{ kind: 'stat', stat: 'health', delta: 10 }, { kind: 'death', cause: 'Again' }] }) })
    expect(lifeState(s)).toEqual(before)
  })
})

describe('SKIP with a bad age (review finding 12)', () => {
  test('NaN, Infinity and negative ages are ignored', () => {
    let s = stepLife(newLife({ name: 'G' }), { type: 'SKIP', toAge: 30 })
    for (const toAge of [Number.NaN, Number.POSITIVE_INFINITY, -5]) s = stepLife(s, { type: 'SKIP', toAge })
    expect(lifeState(s).age).toBe(30)
  })
})

describe('OUTCOME with untrustworthy numbers (final review, finding 3)', () => {
  test('a NaN delta and a NaN age leave a valid, savable life', () => {
    const s = stepLife(newLife({ name: 'G' }), {
      type: 'OUTCOME',
      atAge: Number.NaN,
      outcome: outcome({ effects: [{ kind: 'stat', stat: 'health', delta: Number.NaN }, { kind: 'stat', stat: 'money', delta: Number.POSITIVE_INFINITY }] }),
    })
    expect(lifeState(s).stats).toEqual({ health: 70, happiness: 50, money: 100, notoriety: 0 })
    expect(lifeState(s).log[0]?.age).toBe(0)
    expect(() => loadLife(saveLife(s))).not.toThrow()
  })
})
