import type { LifeState } from './types'

const MAX_FACTS = 12
/** Stays under the 1200-character limit of the gateway's request schema. */
const MAX_SUMMARY = 1100

/** Collapses control characters and newlines so model-written text cannot break out of a prompt line. */
export function oneLine(text: string, max = 80): string {
  return text
    .replace(/[\u0000-\u001f\u007f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

/** A single-line description of the Subject for the model. Facts are model-written, so they are sanitized. */
export function stateSummary(state: LifeState): string {
  const { stats } = state
  const facts = Object.entries(state.facts)
    .slice(-MAX_FACTS)
    .map(([k, v]) => `${oneLine(k, 40)}: ${oneLine(v, 80)}`)
    .join('; ')
  const status = state.alive ? '' : ' (dead)'
  const line =
    `${oneLine(state.name, 40)}, age ${state.age}, ${state.stage}${status}. ` +
    `Health ${stats.health}, Happiness ${stats.happiness}, Money $${stats.money}, Notoriety ${stats.notoriety}.` +
    (facts ? ` Facts: ${facts}.` : '')
  return line.slice(0, MAX_SUMMARY)
}

export function logTail(state: LifeState, count = 8): string[] {
  return state.log.slice(-count).map((l) => `${l.age}: ${oneLine(l.text, 160)}`)
}
