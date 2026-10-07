import type { Rng } from './rng'
import type { ChoiceTag, GeneratedEvent, LifeState } from './types'

/** Personality sliders, each 0 to 100. Set by the player in "Management style". */
export interface Traits {
  recklessness: number
  greed: number
  kindness: number
  chaos: number
}

export interface DecisionContext {
  event: GeneratedEvent
  traits: Traits
  state: LifeState
}

export interface Decider {
  /** Resolves to the id of the chosen choice. */
  pick(context: DecisionContext, signal?: AbortSignal): Promise<string>
}

export const DEFAULT_TRAITS: Traits = { recklessness: 50, greed: 50, kindness: 50, chaos: 50 }

function tagWeight(tag: ChoiceTag, t: Traits): number {
  switch (tag) {
    case 'risky':
      return t.recklessness
    case 'safe':
      return 100 - t.recklessness
    case 'greedy':
      return t.greed
    case 'kind':
      return t.kindness
    case 'chaotic':
      return t.chaos
    case 'lazy':
      return 100 - t.chaos
  }
}

/** Mean of the tag weights. A choice with no tags scores a neutral 50. */
export function policyScore(tags: readonly ChoiceTag[], traits: Traits): number {
  if (tags.length === 0) return 50
  return tags.reduce((sum, tag) => sum + tagWeight(tag, traits), 0) / tags.length
}

/** Highest-score choice id. Ties are broken with the seeded generator. */
export function argmaxWithTies(scores: Record<string, number>, rng: Rng): string {
  const ids = Object.keys(scores)
  if (ids.length === 0) throw new Error('No choices to decide between')
  const best = Math.max(...ids.map((id) => scores[id] as number))
  return rng.pick(ids.filter((id) => scores[id] === best))
}

/** Offline decider that needs no network: scores choices by their tags and the player's traits. */
export function createPolicyDecider(rng: Rng): Decider {
  return {
    async pick({ event, traits }) {
      const scores: Record<string, number> = {}
      for (const c of event.choices) scores[c.id] = policyScore(c.tags, traits)
      return argmaxWithTies(scores, rng)
    },
  }
}
