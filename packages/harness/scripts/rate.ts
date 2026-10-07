// Writes a CSV of 100 recorded events for a human to rate funny (0 to 3) and safe (yes/no).
import { createRng } from '@stc/sim-core'
import { readFile, writeFile } from 'node:fs/promises'
import { parseRecorded, ratingCsv } from '../src'

const { events } = parseRecorded(await readFile(new URL('../fixtures/recorded.jsonl', import.meta.url), 'utf8'))
await writeFile(new URL('../fixtures/rating-sample.csv', import.meta.url), ratingCsv(events, 100, createRng(2026)))
console.log(`Wrote fixtures/rating-sample.csv with ${Math.min(100, events.length)} rows.`)
