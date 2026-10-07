import { describe, expect, test } from 'bun:test'
import { createRng, type GeneratedEvent } from '@stc/sim-core'
import { parseRecorded } from '../src/recorded'
import { ratingCsv } from '../src/rating-sample'

const event = (narration: string): GeneratedEvent => ({
  narration,
  intensity: 1,
  choices: [
    { id: 'c1', label: 'Say "hi", loudly', tags: ['kind'], outcome: { narration: 'It works.\nMostly.', effects: [] } },
    { id: 'c2', label: 'Leave.', tags: ['lazy'], outcome: { narration: 'Nothing.', effects: [] } },
  ],
})

describe('parseRecorded', () => {
  test('keeps valid lines and counts invalid ones without throwing', () => {
    const jsonl = [JSON.stringify(event('one')), 'not json', '{"narration":"x"}', '', JSON.stringify(event('two'))].join('\n')
    const { events, invalid } = parseRecorded(jsonl)
    expect(events.map((e) => e.narration)).toEqual(['one', 'two'])
    expect(invalid).toBe(2)
  })

  test('an empty file is zero events', () => {
    expect(parseRecorded('')).toEqual({ events: [], invalid: 0 })
  })
})

describe('ratingCsv', () => {
  test('escapes quotes, commas and newlines and leaves the rating columns empty', () => {
    const csv = ratingCsv([event('A, "quoted" start')], 5, createRng(1))
    expect(csv.split('\n')[0]).toBe('id,narration,choices,funny_0_to_3,safe_yes_no')
    expect(csv).toContain('"A, ""quoted"" start"')
    expect(csv).toContain('Say ""hi"", loudly')
    expect(csv).toContain('It works. Mostly.')
    expect(csv.trimEnd().endsWith(',,')).toBe(true)
  })

  test('samples without repeats, at most the number available, reproducibly', () => {
    const events = Array.from({ length: 10 }, (_, i) => event(`event ${i}`))
    const rows = ratingCsv(events, 4, createRng(3)).trim().split('\n').slice(1)
    expect(rows).toHaveLength(4)
    expect(new Set(rows.map((r) => r.split(',')[1])).size).toBe(4)
    expect(ratingCsv(events, 4, createRng(3))).toBe(ratingCsv(events, 4, createRng(3)))
    expect(ratingCsv(events, 99, createRng(3)).trim().split('\n')).toHaveLength(11)
  })
})
