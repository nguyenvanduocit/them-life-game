import type { GeneratedEvent, Rng } from '@stc/sim-core'

/** One spreadsheet cell on one line: newlines become spaces, quotes are doubled. */
const cell = (text: string): string => `"${text.replace(/\s*\n\s*/g, ' ').replace(/"/g, '""')}"`

/**
 * CSV for a human to rate: one row per event with empty "funny" (0 to 3) and
 * "safe" (yes/no) columns. Sampling is seeded so a rating round is reproducible.
 */
export function ratingCsv(events: readonly GeneratedEvent[], count: number, rng: Rng): string {
  const pool = [...events]
  const rows: string[] = ['id,narration,choices,funny_0_to_3,safe_yes_no']
  const take = Math.min(count, pool.length)
  for (let i = 0; i < take; i++) {
    const [event] = pool.splice(rng.int(pool.length), 1)
    if (!event) break
    const choices = event.choices.map((c) => `${c.label} => ${c.outcome.narration}`).join(' | ')
    rows.push([i + 1, cell(event.narration), cell(choices), '', ''].join(','))
  }
  return rows.join('\n') + '\n'
}
