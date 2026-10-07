import type { Rng } from '@stc/sim-core'
import type { GeneratedEvent } from '@stc/sim-core'

export type ContradictionKind = 'text-kills' | 'death-unmentioned' | 'money-lost-unstated' | 'money-gain-unstated'
export const CONTRADICTION_KINDS: readonly ContradictionKind[] = ['text-kills', 'death-unmentioned', 'money-lost-unstated', 'money-gain-unstated']

export interface LabeledEvent {
  event: GeneratedEvent
  /** True when text and effects were made to disagree on purpose. */
  contradicts: boolean
  kind?: ContradictionKind
}

/** Returns a copy of the event whose first choice's text and effects disagree in the named way. */
export function injectContradiction(event: GeneratedEvent, kind: ContradictionKind): GeneratedEvent {
  const copy = structuredClone(event)
  const choice = copy.choices[0]
  if (!choice) return copy
  const withoutMoney = choice.outcome.effects.filter((e) => !(e.kind === 'stat' && e.stat === 'money'))
  const withoutDeath = choice.outcome.effects.filter((e) => e.kind !== 'death')

  if (kind === 'text-kills') {
    choice.outcome.narration += ' Then he dies.'
    choice.outcome.effects = withoutDeath
  } else if (kind === 'death-unmentioned') {
    // Prefer a choice that does not already declare a death, or the injection would change nothing.
    const target = copy.choices.find((c) => !c.outcome.effects.some((e) => e.kind === 'death')) ?? choice
    target.outcome.effects = [...target.outcome.effects.filter((e) => e.kind !== 'death'), { kind: 'death', cause: 'Unspecified causes' }]
  } else if (kind === 'money-lost-unstated') {
    choice.outcome.narration += ' He pays $50 for it.'
    choice.outcome.effects = withoutMoney
  } else {
    choice.outcome.narration += ' He finds $80 on the floor.'
    choice.outcome.effects = withoutMoney
  }
  return copy
}

function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const out = [...items]
  for (let i = out.length - 1; i > 0; i--) {
    const j = rng.int(i + 1)
    ;[out[i], out[j]] = [out[j] as T, out[i] as T]
  }
  return out
}

/** Half the events get a contradiction (rounded down), the rest stay as they are. Order is shuffled. */
export function buildLabeledSet(events: readonly GeneratedEvent[], rng: Rng): LabeledEvent[] {
  const shuffled = shuffle(events, rng)
  const injectCount = Math.floor(shuffled.length / 2)
  const out: LabeledEvent[] = shuffled.map((event, i) => {
    if (i >= injectCount) return { event, contradicts: false }
    const kind = rng.pick(CONTRADICTION_KINDS)
    return { event: injectContradiction(event, kind), contradicts: true, kind }
  })
  return shuffle(out, rng)
}
