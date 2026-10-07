export const STATS = ['health', 'happiness', 'money', 'notoriety'] as const
export type Stat = (typeof STATS)[number]

export const CHOICE_TAGS = ['risky', 'safe', 'greedy', 'kind', 'chaotic', 'lazy'] as const
export type ChoiceTag = (typeof CHOICE_TAGS)[number]

export type Intensity = 1 | 2 | 3
export type Stage = 'child' | 'teen' | 'adult' | 'elder'

export type Effect =
  | { kind: 'stat'; stat: Stat; delta: number }
  | { kind: 'fact'; key: string; value: string }
  | { kind: 'death'; cause: string }

export interface Outcome {
  narration: string
  effects: Effect[]
}

export interface Choice {
  id: string
  label: string
  tags: ChoiceTag[]
  outcome: Outcome
}

export interface GeneratedEvent {
  narration: string
  intensity: Intensity
  choices: Choice[]
}

export interface LogEntry {
  age: number
  text: string
  tags: string[]
}

export interface LifeState {
  schemaVersion: number
  name: string
  age: number
  stage: Stage
  alive: boolean
  stats: Record<Stat, number>
  facts: Record<string, string>
  causeOfDeath: string | null
  log: LogEntry[]
}
