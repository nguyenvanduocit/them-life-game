import { describe, expect, test } from 'bun:test'
import type { GeneratedEvent, TextSource } from '@stc/sim-core'
import { runBatch, summarizeLives } from '../src/batch'

const event: GeneratedEvent = {
  narration: 'A pigeon files a complaint.',
  intensity: 2,
  choices: [
    { id: 'c1', label: 'Read it.', tags: ['kind'], outcome: { narration: 'It is in pigeon.', effects: [{ kind: 'stat', stat: 'notoriety', delta: 2 }] } },
    { id: 'c2', label: 'Ignore it.', tags: ['lazy'], outcome: { narration: 'It files another.', effects: [] } },
  ],
}
const text: TextSource = { generate: async () => structuredClone(event) }

describe('runBatch', () => {
  test('200 seeded lives all end in death, none from the fallback, with a sensible death age range', async () => {
    const s = await runBatch(200, { text, checker: null })
    expect(s.lives).toBe(200)
    expect(s.stillAlive).toBe(0)
    expect(s.fallbackShare).toBe(0)
    expect(s.earlyDeathShare).toBe(0)
    expect(s.p10DeathAge).toBeGreaterThanOrEqual(66)
    expect(s.p90DeathAge).toBeLessThanOrEqual(100)
    expect(s.meanNotoriety).toBeGreaterThan(0)
  })

  test('is reproducible: the same seeds give the same summary', async () => {
    expect(await runBatch(30, { text, checker: null }, 5)).toEqual(await runBatch(30, { text, checker: null }, 5))
  })

  test('summarizing nothing gives zeros', () => {
    expect(summarizeLives([])).toMatchObject({ lives: 0, meanDeathAge: 0, fallbackShare: 0, earlyDeathShare: 0 })
  })
})
