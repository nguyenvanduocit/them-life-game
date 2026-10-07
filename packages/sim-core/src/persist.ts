import { createActor, type Snapshot } from 'xstate'
import { z } from 'zod'
import { lifeMachine, SCHEMA_VERSION, stageForAge, type LifeSnapshot } from './life-machine'

export class SnapshotError extends Error {}

export const lifeStateSchema = z.object({
  schemaVersion: z.literal(SCHEMA_VERSION),
  name: z.string(),
  age: z.number().int().min(0),
  stage: z.enum(['child', 'teen', 'adult', 'elder']),
  alive: z.boolean(),
  stats: z.object({ health: z.number().min(0).max(100), happiness: z.number().min(0).max(100), money: z.number(), notoriety: z.number().min(0).max(100) }),
  facts: z.record(z.string(), z.string()),
  causeOfDeath: z.string().nullable(),
  log: z.array(z.object({ age: z.number(), text: z.string(), tags: z.array(z.string()) })),
})

const envelopeSchema = z.object({
  schemaVersion: z.number(),
  snapshot: z.looseObject({ context: z.unknown(), value: z.unknown(), status: z.unknown() }),
})

/** Serializes a life to a string safe to store in a database or a file. */
export function saveLife(snapshot: LifeSnapshot): string {
  return JSON.stringify({ schemaVersion: SCHEMA_VERSION, snapshot: lifeMachine.getPersistedSnapshot(snapshot) })
}

/** Restores a life saved by saveLife. Throws SnapshotError on anything it cannot trust. */
export function loadLife(json: string): LifeSnapshot {
  let raw: unknown
  try {
    raw = JSON.parse(json)
  } catch {
    throw new SnapshotError('Snapshot is not valid JSON')
  }
  const envelope = envelopeSchema.safeParse(raw)
  if (!envelope.success) throw new SnapshotError('Snapshot has an unexpected shape')
  if (envelope.data.schemaVersion !== SCHEMA_VERSION) {
    throw new SnapshotError(`Unsupported snapshot version ${envelope.data.schemaVersion}; this build reads version ${SCHEMA_VERSION}`)
  }
  const context = lifeStateSchema.safeParse(envelope.data.snapshot.context)
  if (!context.success) throw new SnapshotError('Snapshot context failed validation')
  // The machine state and the context must tell the same story, or restored code would act on a lie.
  const { value, status } = envelope.data.snapshot
  const dead = !context.data.alive
  const consistent = dead
    ? value === 'dead' && status === 'done'
    : value === context.data.stage && status === 'active' && context.data.stage === stageForAge(context.data.age)
  if (!consistent) throw new SnapshotError('Snapshot state disagrees with its context')
  try {
    // `input` is required by the types but ignored when a snapshot is supplied.
    const snapshot = envelope.data.snapshot as unknown as Snapshot<unknown>
    return createActor(lifeMachine, { snapshot, input: { name: '' } }).getSnapshot()
  } catch {
    throw new SnapshotError('Snapshot could not be restored')
  }
}
