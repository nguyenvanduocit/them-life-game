import { generatedEventSchema, type GeneratedEvent } from '@stc/sim-core'

export interface RecordedLoad {
  events: GeneratedEvent[]
  /** Lines that were blank-free but not valid events. */
  invalid: number
}

/** Parses JSONL of recorded model outputs. Bad lines are counted, never thrown. */
export function parseRecorded(jsonl: string): RecordedLoad {
  const events: GeneratedEvent[] = []
  let invalid = 0
  for (const line of jsonl.split('\n')) {
    if (!line.trim()) continue
    try {
      const parsed = generatedEventSchema.safeParse(JSON.parse(line))
      if (parsed.success) events.push(parsed.data)
      else invalid++
    } catch {
      invalid++
    }
  }
  return { events, invalid }
}
