import { z } from 'zod'
import { HIGHLIGHT_KINDS, type Highlight } from './plan'
import { CHOICE_TAGS, STATS, type Intensity } from './types'

export const effectSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('stat'), stat: z.enum(STATS), delta: z.number() }),
  z.object({ kind: z.literal('fact'), key: z.string().min(1), value: z.string().min(1) }),
  z.object({ kind: z.literal('death'), cause: z.string().min(1) }),
])

export const choiceSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9_-]{1,40}$/),
  label: z.string().min(1).max(160),
  tags: z.array(z.enum(CHOICE_TAGS)).max(4),
  outcome: z.object({
    narration: z.string().min(1).max(600),
    effects: z.array(effectSchema).max(8),
  }),
})

export const generatedEventSchema = z
  .object({
    narration: z.string().min(1).max(600),
    intensity: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    choices: z.array(choiceSchema).min(2).max(4),
  })
  .refine((e) => new Set(e.choices.map((c) => c.id)).size === e.choices.length, { message: 'Choice ids must be unique' })

export interface ToneProfile {
  name: string
  /** Events above this intensity are rejected. */
  maxIntensity: Intensity
}

export interface EventRequest {
  /** One-line state description. See stateSummary. */
  stateSummary: string
  /** Recent log lines, oldest first. See logTail. */
  logTail: string[]
  tone: ToneProfile
  highlight: Highlight
  seed: number
  /** 0 for the first try, then 1, 2 on regeneration. */
  attempt: number
}

/**
 * Anything that can produce an event: a model behind the gateway, a recorded
 * fixture, a hand-written pool. The return value is untrusted and the pipeline
 * validates it with generatedEventSchema.
 */
export interface TextSource {
  generate(request: EventRequest, signal?: AbortSignal): Promise<unknown>
}

/** Wire format of an EventRequest, shared by the client and the gateway. */
export const eventRequestSchema: z.ZodType<EventRequest> = z.object({
  stateSummary: z.string().max(1200),
  logTail: z.array(z.string().max(300)).max(12),
  tone: z.object({ name: z.string().min(1).max(40), maxIntensity: z.union([z.literal(1), z.literal(2), z.literal(3)]) }),
  highlight: z.object({
    index: z.number().int().min(0).max(40),
    kind: z.enum([...HIGHLIGHT_KINDS, 'death']),
    stage: z.enum(['child', 'teen', 'adult', 'elder']),
    age: z.number().int().min(0).max(130),
  }),
  seed: z.number().int(),
  attempt: z.number().int().min(0).max(5),
})
