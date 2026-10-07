import { assign, getInitialSnapshot, getNextSnapshot, setup, type SnapshotFrom } from 'xstate'
import { applyEffects } from './effects'
import type { LifeState, Outcome, Stage } from './types'

export const SCHEMA_VERSION = 1

export type LifeEvent =
  | { type: 'SKIP'; toAge: number }
  /** Effects must already be clamped by the pipeline. */
  | { type: 'OUTCOME'; outcome: Outcome; atAge: number }

export interface LifeInput {
  name: string
  facts?: Record<string, string>
}

export function stageForAge(age: number): Stage {
  if (age < 13) return 'child'
  if (age < 20) return 'teen'
  if (age < 65) return 'adult'
  return 'elder'
}

export const lifeMachine = setup({
  types: {
    context: {} as LifeState,
    events: {} as LifeEvent,
    input: {} as LifeInput,
  },
  guards: {
    isDead: ({ context }) => !context.alive,
    isTeen: ({ context }) => stageForAge(context.age) === 'teen',
    isAdult: ({ context }) => stageForAge(context.age) === 'adult',
    isElder: ({ context }) => stageForAge(context.age) === 'elder',
  },
  actions: {
    skip: assign(({ context, event }) =>
      event.type === 'SKIP' && Number.isFinite(event.toAge) && event.toAge >= 0 ? { age: Math.max(context.age, Math.floor(event.toAge)) } : {},
    ),
    outcome: assign(({ context, event }) => {
      if (event.type !== 'OUTCOME') return {}
      const next = applyEffects(context, event.outcome.effects)
      const atAge = Number.isFinite(event.atAge) && event.atAge >= 0 ? Math.floor(event.atAge) : context.age
      return { ...next, log: [...context.log, { age: atAge, text: event.outcome.narration, tags: [] }] }
    }),
  },
}).createMachine({
  id: 'life',
  context: ({ input }) => ({
    schemaVersion: SCHEMA_VERSION,
    name: input.name,
    age: 0,
    stage: 'child',
    alive: true,
    stats: { health: 70, happiness: 50, money: 100, notoriety: 0 },
    facts: input.facts ?? {},
    causeOfDeath: null,
    log: [],
  }),
  initial: 'child',
  states: {
    child: {
      entry: assign({ stage: 'child' }),
      always: [
        { guard: 'isDead', target: 'dead' },
        { guard: 'isTeen', target: 'teen' },
        { guard: 'isAdult', target: 'adult' },
        { guard: 'isElder', target: 'elder' },
      ],
      on: { SKIP: { actions: 'skip' }, OUTCOME: { actions: 'outcome' } },
    },
    teen: {
      entry: assign({ stage: 'teen' }),
      always: [
        { guard: 'isDead', target: 'dead' },
        { guard: 'isAdult', target: 'adult' },
        { guard: 'isElder', target: 'elder' },
      ],
      on: { SKIP: { actions: 'skip' }, OUTCOME: { actions: 'outcome' } },
    },
    adult: {
      entry: assign({ stage: 'adult' }),
      always: [
        { guard: 'isDead', target: 'dead' },
        { guard: 'isElder', target: 'elder' },
      ],
      on: { SKIP: { actions: 'skip' }, OUTCOME: { actions: 'outcome' } },
    },
    elder: {
      entry: assign({ stage: 'elder' }),
      always: [{ guard: 'isDead', target: 'dead' }],
      on: { SKIP: { actions: 'skip' }, OUTCOME: { actions: 'outcome' } },
    },
    dead: { type: 'final' },
  },
})

export type LifeSnapshot = SnapshotFrom<typeof lifeMachine>

export function newLife(input: LifeInput): LifeSnapshot {
  return getInitialSnapshot(lifeMachine, input)
}

/** Pure transition. A finished (dead) life ignores every event. */
export function stepLife(snapshot: LifeSnapshot, event: LifeEvent): LifeSnapshot {
  return getNextSnapshot(lifeMachine, snapshot, event)
}

export function lifeState(snapshot: LifeSnapshot): LifeState {
  return snapshot.context
}
