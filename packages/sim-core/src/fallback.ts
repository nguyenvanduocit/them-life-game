import type { Rng } from './rng'
import type { ChoiceTag, Effect, GeneratedEvent, Stat } from './types'

const s = (stat: Stat, delta: number): Effect => ({ kind: 'stat', stat, delta })

type Row = [label: string, tag: ChoiceTag, outcome: string, effects: Effect[]]

const ev = (narration: string, rows: Row[]): GeneratedEvent => ({
  narration,
  intensity: 1,
  choices: rows.map(([label, tag, outcome, effects], i) => ({
    id: `c${i + 1}`,
    label,
    tags: [tag],
    outcome: { narration: outcome, effects },
  })),
})

/**
 * About 20 neutral, mild events used only when the AI path fails. All are
 * intensity 1 and none can kill the Subject.
 */
export const FALLBACK_EVENTS: readonly GeneratedEvent[] = [
  ev('A revolving door holds you inside for nine minutes. Nobody helps.', [
    ['Wait it out.', 'lazy', 'The door lets go. You tell no one.', [s('happiness', -2)]],
    ['Push harder.', 'risky', 'The door wins. Your shoulder files a complaint.', [s('health', -4), s('notoriety', 3)]],
  ]),
  ev('You find a wallet. It contains $40 and a very detailed grudge list.', [
    ['Return it.', 'kind', 'The owner is moved. The list is not mentioned.', [s('happiness', 5)]],
    ['Keep the $40.', 'greedy', 'The money is yours. The list is now also yours.', [s('money', 40), s('notoriety', 2), { kind: 'fact', key: 'grudge list', value: 'in your possession' }]],
  ]),
  ev('Your neighbor Kevin waves at you with too much confidence.', [
    ['Wave back.', 'kind', 'Kevin takes this as a contract.', [s('happiness', 2), { kind: 'fact', key: 'Kevin', value: 'thinks you are friends' }]],
    ['Pretend not to see him.', 'safe', 'Kevin sees you pretend. He writes it down.', [s('notoriety', 1)]],
    ['Wave aggressively.', 'chaotic', 'Kevin leaves. The wave stays.', [s('notoriety', 4)]],
  ]),
  ev('A pigeon follows you for six blocks.', [
    ['Feed it.', 'kind', 'The pigeon nods once. It will remember this.', [s('happiness', 3), s('money', -2)]],
    ['Run.', 'risky', 'It is faster than you. It lets you win.', [s('health', 2), s('happiness', -2)]],
  ]),
  ev('Someone has parked in your spot, and left a note that says "sorry :)".', [
    ['Leave a note back.', 'chaotic', 'The notes continue for three weeks.', [s('notoriety', 3), s('happiness', 2)]],
    ['Park somewhere else.', 'safe', 'Nothing happens. You feel unreasonably robbed.', [s('happiness', -3)]],
  ]),
  ev('A stranger asks you to hold a ladder. Just hold it.', [
    ['Hold the ladder.', 'kind', 'The stranger climbs out of sight. You hold the ladder for an hour.', [s('happiness', 1), s('notoriety', 2)]],
    ['Decline.', 'safe', 'The ladder falls. Not your problem, legally.', [s('notoriety', 1)]],
  ]),
  ev('Your phone autocorrects a message to your boss into something worse.', [
    ['Own it.', 'risky', 'Your boss respects the confidence. HR does not.', [s('notoriety', 5), s('money', -20)]],
    ['Send an apology.', 'safe', 'The apology is also autocorrected.', [s('happiness', -3)]],
  ]),
  ev('A coupon expires today and you are three hours away from using it.', [
    ['Race to use it.', 'risky', 'You arrive as the shop closes. The coupon is now a souvenir.', [s('health', -2), s('happiness', -1)]],
    ['Let it go.', 'lazy', 'You feel at peace and slightly poorer.', [s('happiness', 2)]],
  ]),
  ev('The office microwave is on fire and everyone is looking at you.', [
    ['Put it out.', 'kind', 'You are briefly a hero, then briefly a suspect.', [s('notoriety', 4), s('happiness', 1)]],
    ['Leave quietly.', 'lazy', 'The fire is put out by someone else. They remember.', [s('notoriety', 2)]],
    ['Take a photo.', 'chaotic', 'The photo goes everywhere.', [s('notoriety', 6), s('happiness', 2)]],
  ]),
  ev('You win a raffle prize: one slightly used canoe.', [
    ['Keep the canoe.', 'greedy', 'The canoe lives in your hallway now.', [s('happiness', 3), { kind: 'fact', key: 'canoe', value: 'in the hallway' }]],
    ['Sell it.', 'greedy', 'A man pays $150 and asks no questions.', [s('money', 150)]],
  ]),
  ev('A child at the bus stop asks if you are a real adult.', [
    ['Say yes.', 'safe', 'The child looks unconvinced.', [s('happiness', -1)]],
    ['Say no.', 'chaotic', 'The child nods like this explains a lot.', [s('notoriety', 2)]],
  ]),
  ev('The bakery gives you a free muffin and a look.', [
    ['Eat it on the spot.', 'chaotic', 'It is the best muffin of your life. The look continues.', [s('happiness', 5), s('health', -1)]],
    ['Save it.', 'safe', 'You forget it in a coat. It becomes a legend.', [s('happiness', 1)]],
  ]),
  ev('Your landlord leaves a voicemail that is only breathing and the word "Thursday".', [
    ['Call back.', 'risky', 'He answers. He has forgotten why he called.', [s('happiness', 1)]],
    ['Ignore it.', 'lazy', 'Thursday arrives. Nothing happens. Somehow worse.', [s('happiness', -2)]],
  ]),
  ev('A mysterious envelope arrives with $60 inside and no explanation.', [
    ['Spend it.', 'greedy', 'It is gone by Friday. You regret nothing.', [s('money', 60), s('happiness', 4)]],
    ['Investigate.', 'risky', 'The trail ends at a laundromat that is closed forever.', [s('notoriety', 3), s('money', 60)]],
  ]),
  ev('You are chosen for jury duty. The case is about a missing sandwich.', [
    ['Take it seriously.', 'kind', 'Justice is served. The sandwich is not found.', [s('notoriety', 2), s('happiness', 1)]],
    ['Vote guilty immediately.', 'chaotic', 'The room is silent. The sandwich is declared guilty.', [s('notoriety', 5)]],
  ]),
  ev('Your friend asks you to help them move. They own a piano.', [
    ['Help.', 'kind', 'You lift a piano. The piano remembers.', [s('health', -6), s('happiness', 4)]],
    ['Bring snacks only.', 'lazy', 'The snacks are well received. The piano is not mentioned.', [s('happiness', 2), s('money', -8)]],
  ]),
  ev('An elevator stops between floors, and someone starts humming.', [
    ['Hum along.', 'chaotic', 'You harmonize. The elevator resumes.', [s('notoriety', 3), s('happiness', 3)]],
    ['Stare at the numbers.', 'safe', 'The numbers do not help.', [s('happiness', -1)]],
  ]),
  ev('A dog on the sidewalk looks at you like you owe it money.', [
    ['Pay up.', 'kind', 'You give it a biscuit. It considers the debt settled.', [s('money', -3), s('happiness', 3)]],
    ['Stand your ground.', 'risky', 'The dog wins by staring.', [s('happiness', -2)]],
  ]),
  ev('You accidentally join a book club for a book you have never heard of.', [
    ['Bluff.', 'chaotic', 'You are now the group expert on a book that may not exist.', [s('notoriety', 4), s('happiness', 2)]],
    ['Confess.', 'kind', 'They invite you back anyway. The book is terrible.', [s('happiness', 3)]],
  ]),
  ev('The self-checkout says "unexpected item in the bagging area". It is your hat.', [
    ['Argue with it.', 'chaotic', 'The machine calls a manager. The manager agrees with the machine.', [s('notoriety', 3), s('happiness', -2)]],
    ['Remove the hat.', 'safe', 'The machine is satisfied. You are not.', [s('happiness', -1)]],
  ]),
]

/** Returns a copy of a random fallback event so callers cannot mutate the pool. */
export function pickFallback(rng: Rng): GeneratedEvent {
  return structuredClone(rng.pick(FALLBACK_EVENTS)) as GeneratedEvent
}
