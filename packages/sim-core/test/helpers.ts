import type { GeneratedEvent, LifeState } from '../src/types'

export function makeState(over: Partial<LifeState> = {}): LifeState {
  return {
    schemaVersion: 1,
    name: 'Gary Pembrook',
    age: 34,
    stage: 'adult',
    alive: true,
    stats: { health: 64, happiness: 38, money: 212, notoriety: 21 },
    facts: {},
    causeOfDeath: null,
    log: [],
    ...over,
  }
}

export function makeEvent(over: Partial<GeneratedEvent> = {}): GeneratedEvent {
  return {
    narration: 'Mr. Dunmore says rent is due today. You have $212 and a very confident hot dog.',
    intensity: 2,
    choices: [
      {
        id: 'c1',
        label: 'Pay with the hot dog.',
        tags: ['chaotic'],
        outcome: {
          narration: 'Mr. Dunmore studies the hot dog for a long time. "Fine," he says. "But I\'m taking the bun."',
          effects: [
            { kind: 'stat', stat: 'notoriety', delta: 9 },
            { kind: 'stat', stat: 'happiness', delta: 6 },
            { kind: 'stat', stat: 'health', delta: -3 },
            { kind: 'fact', key: 'Mr. Dunmore', value: 'has a bun' },
          ],
        },
      },
      {
        id: 'c2',
        label: 'Pay $212 and eat ramen like a coward.',
        tags: ['safe'],
        outcome: {
          narration: 'The rent is paid. The ramen is sad.',
          effects: [
            { kind: 'stat', stat: 'money', delta: -212 },
            { kind: 'stat', stat: 'happiness', delta: -4 },
          ],
        },
      },
      {
        id: 'c3',
        label: 'Hide in the bathtub until Thursday.',
        tags: ['lazy'],
        outcome: {
          narration: 'It is Thursday. The bathtub is now your home.',
          effects: [
            { kind: 'fact', key: 'home', value: 'a bathtub' },
            { kind: 'stat', stat: 'happiness', delta: -2 },
          ],
        },
      },
    ],
    ...over,
  }
}
