import type { Decider, Traits } from './decider'
import { lifeState, newLife, stepLife, type LifeSnapshot } from './life-machine'
import { produceEvent, type PipelineDeps, type PipelineResult } from './pipeline'
import { planLife, type Highlight } from './plan'
import { logTail, stateSummary } from './prompt-context'
import type { EventRequest, ToneProfile } from './text-source'
import type { LifeState } from './types'

export interface QuickLifeDeps extends PipelineDeps {
  decider: Decider
  traits: Traits
  tone: ToneProfile
  name: string
  seed: number
}

export interface LifeStep {
  highlight: Highlight
  result: PipelineResult
  chosenId: string
  before: LifeState
  after: LifeState
}

export interface QuickLifeResult {
  final: LifeState
  snapshot: LifeSnapshot
  steps: LifeStep[]
  durationMs: number
}

/** A safe integer for the wire format, whatever seed the caller passed. */
function requestSeed(seed: number, index: number): number {
  const base = Number.isFinite(seed) ? Math.abs(Math.trunc(seed)) % 1_000_000 : 0
  return base * 1000 + index
}

/**
 * Plays a whole life automatically: the plan's highlights in order, the
 * decider picking every choice. The final highlight always ends the life.
 * Interactive play drives produceEvent and stepLife itself, one highlight at a time.
 */
export async function playQuickLife(deps: QuickLifeDeps, signal?: AbortSignal): Promise<QuickLifeResult> {
  const started = performance.now()
  let snapshot = newLife({ name: deps.name })
  const steps: LifeStep[] = []

  for (const highlight of planLife(deps.seed)) {
    if (!lifeState(snapshot).alive) break
    snapshot = stepLife(snapshot, { type: 'SKIP', toAge: highlight.age })
    const before = lifeState(snapshot)

    const request: EventRequest = {
      stateSummary: stateSummary(before),
      logTail: logTail(before),
      tone: deps.tone,
      highlight,
      seed: requestSeed(deps.seed, highlight.index),
      attempt: 0,
    }
    const result = await produceEvent(deps, request, before, signal)
    const chosenId = await deps.decider.pick({ event: result.event, traits: deps.traits, state: before }, signal)
    const choice = result.event.choices.find((c) => c.id === chosenId) ?? result.event.choices[0]
    if (!choice) throw new Error('A produced event has no choices')

    let outcome = choice.outcome
    if (highlight.kind === 'death' && !outcome.effects.some((e) => e.kind === 'death')) {
      outcome = { ...outcome, effects: [...outcome.effects, { kind: 'death', cause: 'Unspecified causes' }] }
    }
    snapshot = stepLife(snapshot, { type: 'OUTCOME', outcome, atAge: highlight.age })
    steps.push({ highlight, result, chosenId: choice.id, before, after: lifeState(snapshot) })
  }

  return { final: lifeState(snapshot), snapshot, steps, durationMs: performance.now() - started }
}
