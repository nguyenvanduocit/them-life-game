import { describe, expect, test } from 'bun:test'
import { lifeState, newLife, stepLife } from '../src/life-machine'
import { loadLife, saveLife, SnapshotError } from '../src/persist'

describe('save and load', () => {
  test('round-trips a living mid-life snapshot and keeps it playable', () => {
    let s = stepLife(newLife({ name: 'Gary Pembrook' }), { type: 'SKIP', toAge: 34 })
    s = stepLife(s, { type: 'OUTCOME', atAge: 34, outcome: { narration: 'Paid rent with a hot dog.', effects: [{ kind: 'fact', key: 'Mr. Dunmore', value: 'has a bun' }] } })
    const restored = loadLife(saveLife(s))
    expect(restored.value).toBe('adult')
    expect(lifeState(restored)).toEqual(lifeState(s))
    expect(lifeState(stepLife(restored, { type: 'SKIP', toAge: 70 })).stage).toBe('elder')
  })

  test('round-trips a dead life', () => {
    const s = stepLife(newLife({ name: 'G' }), { type: 'OUTCOME', atAge: 1, outcome: { narration: 'x', effects: [{ kind: 'death', cause: 'Optimism' }] } })
    const restored = loadLife(saveLife(s))
    expect(restored.status).toBe('done')
    expect(lifeState(restored).causeOfDeath).toBe('Optimism')
  })

  test('rejects a snapshot from a different schema version', () => {
    const doc = JSON.parse(saveLife(newLife({ name: 'G' })))
    doc.schemaVersion = 2
    expect(() => loadLife(JSON.stringify(doc))).toThrow(SnapshotError)
    expect(() => loadLife(JSON.stringify(doc))).toThrow('Unsupported snapshot version 2')
  })

  test('rejects invalid JSON, wrong shapes and tampered context', () => {
    expect(() => loadLife('not json')).toThrow('not valid JSON')
    expect(() => loadLife('{"hello":1}')).toThrow(SnapshotError)
    const doc = JSON.parse(saveLife(newLife({ name: 'G' })))
    doc.snapshot.context.stats.health = 'lots'
    expect(() => loadLife(JSON.stringify(doc))).toThrow('failed validation')
  })
})

describe('load rejects saves that break the invariants (review finding 12)', () => {
  const tamper = (edit: (doc: any) => void) => {
    const doc = JSON.parse(saveLife(stepLife(newLife({ name: 'G' }), { type: 'SKIP', toAge: 34 })))
    edit(doc)
    return JSON.stringify(doc)
  }

  test('a living machine state with a dead context', () => {
    expect(() => loadLife(tamper((d) => (d.snapshot.context.alive = false)))).toThrow(SnapshotError)
  })

  test('a stage that does not match the age', () => {
    expect(() => loadLife(tamper((d) => (d.snapshot.context.stage = 'elder')))).toThrow(SnapshotError)
    expect(() => loadLife(tamper((d) => (d.snapshot.context.age = 5)))).toThrow(SnapshotError)
  })

  test('stats outside 0..100 for the bounded stats', () => {
    expect(() => loadLife(tamper((d) => (d.snapshot.context.stats.health = 250)))).toThrow(SnapshotError)
    expect(() => loadLife(tamper((d) => (d.snapshot.context.stats.notoriety = -1)))).toThrow(SnapshotError)
  })

  test('a done machine state with a living context', () => {
    expect(() => loadLife(tamper((d) => { d.snapshot.value = 'dead'; d.snapshot.status = 'done' }))).toThrow(SnapshotError)
  })
})
