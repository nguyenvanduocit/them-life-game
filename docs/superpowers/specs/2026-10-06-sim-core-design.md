# Sim Core and Text Gateway: Design (Sub-project 1)

Date: 2026-10-06. Status: draft for owner review. Research basis: `references/` (README.md and docs 01-10).

## 1. Product context

The game is a mobile, comedy-first life simulator with crude, absurd, edgy humor (18+ target). Players share the funniest moments. It has two modes built on one engine:

- **Quick mode:** a whole life in about 3-5 minutes, ending in a shareable summary.
- **Long mode:** one persistent character that lives online like a pet. Events keep happening while the player is away. Minor events resolve immediately. Major events send a push and wait a short window, then Jev decides for the player. The player returns to a funny digest.

Stack: TypeScript, Vue (wrapped for mobile with Capacitor), XState, Colyseus for live sessions, bun server. Runtime AI is the main text source. Realtime social is a core feature of the product.

### Product sub-projects (each gets its own spec)

1. **Sim core and text gateway (this spec).**
2. Quick mode client, share card, age gate and consent.
3. Long mode: database, scheduler, offline Decider, push, digest, Colyseus live room.
4. Social: asynchronous crossovers first, then live rooms, plus report, block and filter.
5. Hook layer: onboarding and first-minute beats.
6. Business layer: ads, purchases, accounts.

## 2. Scope of this spec

In scope:
- A pure TypeScript package `sim-core` that runs on phone and server.
- The `TextSource`, `Verifier`, `Judge` and `Decider` interfaces and their Jev-backed implementations.
- A thin text gateway server that holds model keys.
- A test harness.

Out of scope: UI, accounts, scheduler, push, database, Colyseus rooms, monetization, social, localization.

## 3. Decisions and assumptions

Decisions made by the owner:
- Offline rule is tiered: minor events auto-resolve, major events wait for the player for a short window, then Jev decides.
- Humor is edgy and dark from day one.
- Runtime AI generates the text, with no up-front experiment.
- The AI returns structured output. Jev is the verifier, judge and offline decider.
- The stack is TypeScript, Vue, XState and Colyseus. Realtime social is core. Colyseus serves the live session while a database and scheduler (sub-project 3) hold the durable truth.

Assumptions (owner to correct):
- "Jev" is `typesafe-ai/jev`, an evaluation model called through the Vercel AI SDK `experimental_decide` (checked in `ai@7.0.128`, where the older name `experimental_evaluate` is marked deprecated). It takes one shared state plus a batch of typed questions (`boolean` with a probability, `choice` with a probability per option, `score` over ordered levels). The local `aio-jev-hint` skill reports about 150-230 boolean questions in 1.3-2.4 s. Confidence LOW for production use: availability, cost, terms and behavior on dark content are unverified.
- Default stats are Health, Happiness, Money, Notoriety, each 0-100 except Money, which is a signed integer.
- A quick life is 12-15 AI-narrated highlight events with time-skips between them.
- A tiny authored fallback pool (about 20 neutral events) exists for AI outages. It is used only on failure.

## 4. Architecture

One turn:

```
state -> TextSource.generate -> schema validate -> clamp effects
      -> Jev: Verifier + Judge (one batched call)
      -> (fail: regenerate up to 2x, then fallback event)
      -> present narration and choices
      -> Decider.pick (player | policy | Jev)
      -> core applies chosen outcome effects -> append to life log
```

| Unit | One purpose | Depends on |
|---|---|---|
| `life-machine` | XState machine for life stages and alive/dead; pure, serializable | state |
| `state` | Stats, facts, life log, schema version | none |
| `effects` | Effect vocabulary, budget rules, clamping | state |
| `TextSource` | State summary in, structured event out | none (interface) |
| `Verifier` | Does narration agree with declared effects? | Jev evaluator |
| `Judge` | Is the event safe, on-tone and funny enough? | Jev evaluator |
| `Decider` | Picks a choice: player, policy or Jev | Jev evaluator (Jev variant) |
| `JevEvaluator` | One batched boolean-question transport | AI SDK |
| `pipeline` | Orchestrates generate, validate, check, retry, fallback | all of the above |
| text gateway | Holds model keys, rate limits, per-user budget, caching | model provider |
| harness | Seeded batch simulation with recorded outputs | core |

## 5. Data model

```ts
type Stat = 'health' | 'happiness' | 'money' | 'notoriety'

type Effect =
  | { kind: 'stat'; stat: Stat; delta: number }
  | { kind: 'fact'; key: string; value: string }   // e.g. married_to, job, arrested_for
  | { kind: 'death'; cause: string }

type ChoiceTag = 'risky' | 'safe' | 'greedy' | 'kind' | 'chaotic' | 'lazy'

interface GeneratedEvent {
  narration: string
  intensity: 1 | 2 | 3                // 1 mild, 3 extreme; for rating, toggles and regional builds
  choices: {
    id: string
    label: string
    tags: ChoiceTag[]
    outcome: { narration: string; effects: Effect[] }
  }[]                                 // 2 to 4 choices
}

interface LifeState {
  schemaVersion: number
  name: string
  age: number
  stage: 'child' | 'teen' | 'adult' | 'elder'
  alive: boolean
  stats: Record<Stat, number>
  facts: Record<string, string>
  log: { age: number; text: string; tags: string[] }[]
}
```

Effect budget defaults (configurable): per stat delta at most 30 per event; summed absolute stat deltas at most 50; money delta at most 1000 + 50% of current absolute money; at most one `death` effect per event, allowed when the event's intensity is 3 or the character is in the `elder` stage. Anything outside the budget is clamped, not rejected.

## 6. Jev roles

Jev is called through one `JevEvaluator` with a batched question list per event. Probability threshold default 0.8, configurable.

- **Verifier:** boolean questions such as "Does the narration say the character died while no death effect is declared?" and "Does the outcome narration describe losing money while no negative money effect is declared?". A failed check triggers regeneration.
- **Judge:** questions on safety (no minors in sexual or abusive content, no real-person defamation, no slurs against protected groups), tone (on-brand edgy comedy) and funniness. A failed safety check is fail-closed: the event is dropped. A failed funniness check allows one extra regeneration, then ships the best candidate.
- **Decider (offline):** for each choice, "Would a character with these traits pick <label>?". The highest probability wins, with seeded tie-breaking.

Text the player sees outside the narration (causes of death and facts) is checked for safety in a second, parallel Jev call, kept apart from the verifier call so the verifier cannot infer the declared effects. An event with neither costs one call.

Failure behavior: if Jev is unreachable or times out, the Verifier falls back to clamping only. The Judge falls back to the fallback pool. The Decider falls back to a trait-weighted policy over the choice `tags` (no network needed).

## 7. Text gateway

- One endpoint per operation: `POST /event` (state summary in, `GeneratedEvent` out).
- Model keys live only on the server. The app sends an anonymous device token.
- Per-device rate limit and a daily budget cap. Responses cache by hash of the request for retries.
- Prompt context: state summary, last N log entries (default 8), tone profile, highlight kind and age window.
- Latency plan: the outcome narration ships inside the same payload, so it displays instantly. The next event is generated during the player's reading time.
- Sending character state to a third-party model needs explicit user consent in the app (Apple 5.1.2(i), per `references/08`, MEDIUM). The consent UI belongs to sub-project 2; the gateway refuses requests without a consent flag.

## 8. Quick life plan

`planLife(seed)` returns 12-15 highlight slots across the life stages, each with an age window and a highlight kind. The life ends at the first `death` effect, or at a final death highlight after the last slot. Replays use the recorded event log, since model output is not deterministic.

## 9. Compatibility with long mode

The core exposes `advance(state, event, choiceId)` and `snapshot`/`restore` with a schema version. Long mode (sub-project 3) schedules highlight events on a timer and reuses the same pipeline, so nothing in this core assumes a session.

## 10. Testing

- **Core:** deterministic unit tests with a fake `TextSource` replaying recorded fixtures: clamping, consistency, death rules, snapshot round-trip.
- **Batch simulation:** seeded runs over fixtures to check stat distributions and death timing.
- **Verifier acceptance test:** on 100 recorded model outputs, half with injected narration-versus-effects contradictions, Jev must flag at least 90% of contradictions with at most 10% false positives. The thresholds are a starting proposal. If the test fails, the verifier falls back to deterministic checks over `facts` and `effects`, which is a configuration change.
- **Judge sample:** a human rates 100 generated events for funny and safe. The result is reported, not gated, so the owner can see the real funny rate.

## 11. Risks (accepted, unmeasured at this stage)

| Risk | Why it matters | Mitigation in this design |
|---|---|---|
| Runtime AI is not funny enough | Core promise of the game | Judge gate, human sample rating, `TextSource` is swappable |
| Cost per life | Revenue per user may be low | 12-15 highlights instead of 80 turns, caching, per-user budget |
| Latency per turn | Breaks the quick-tap rhythm | Outcomes in the same payload, prefetch during reading |
| AI backlash and store rules | Players audit for AI; Apple and Google have AI and UGC rules | Consent flag, reporting hooks planned for sub-project 4 |
| Dark content moderation | Model or Jev may refuse or mis-score | Fail-closed Judge, intensity tag, fallback pool |
| Jev fit unverified | Core quality gate depends on it | Verifier acceptance test, deterministic fallbacks |
| Drift between text and state | Broken immersion | Verifier plus state is the only source of truth |

## 12. Success criteria

1. `sim-core` runs the same tests on phone and server runtimes.
2. A full quick life completes end to end against a fake `TextSource` in under 5 seconds.
3. The pipeline survives Jev being unreachable, with every fallback path covered by a test.
4. The verifier acceptance test and the funny-rate report both exist, whether they pass or not.
5. The gateway serves `POST /event` with keys on the server only, rate limits and budget caps enforced.

## 13. Questions for later specs

- Social: what crossover events look like and how moderation works (sub-project 4).
- Business model: ads versus purchases and how AI cost is covered (sub-project 6).
- Localization of AI-generated humor into Vietnamese (affects `TextSource` prompts).
