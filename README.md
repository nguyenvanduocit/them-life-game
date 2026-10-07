# Subject to Change

A comedy-first mobile life simulator. This repository currently holds sub-project 1: the simulation core, the AI text pipeline and the text gateway. Design and research live in `docs/`, `design/` and `references/`.

## Packages

| Package | What it is |
|---|---|
| `@stc/sim-core` | Pure TypeScript. Life machine, effect budget, event pipeline, deciders, quick-life runner, gateway client. Runs on phone and server. |
| `@stc/text-gateway` | bun HTTP server. `POST /event`. Holds model credentials. Enforces consent, rate limits, a daily budget and a cache. |
| `@stc/harness` | Batch simulation, verifier acceptance test against real Jev, rating export for human review. |

## Commands

    bun install
    bun test                       # 180 tests, no network needed
    bun run typecheck

## Run the gateway

    cp .env.example .env           # set TEXT_MODEL and your provider's credentials
    TEXT_MODEL=<model id> bun run --filter '@stc/text-gateway' start   # PORT, DAILY_BUDGET, GLOBAL_DAILY_BUDGET are optional whole numbers

Credentials are read by the AI SDK from the environment. They never go in the app or the repo.

## Live checks (need a gateway and Jev access)

    JEV_LIVE=1 bun test packages/sim-core/test/evaluator.test.ts         # Jev answers a boolean question
    GATEWAY_URL=http://localhost:8787 bun run packages/harness/scripts/record.ts 100
    bun run packages/harness/scripts/acceptance.ts                        # verifier recall and false positives
    bun run packages/harness/scripts/rate.ts                              # CSV for a human to rate funny and safe

Review `fixtures/recorded.jsonl` by hand before treating it as the clean half of the acceptance set.
If Jev misses the acceptance target (recall 0.9, false positives 0.1), create the checker with `{ ...DEFAULT_CHECK_CONFIG, verifier: 'deterministic' }`. Jev keeps judging safety, tone and humor; only the text-versus-effects check moves off Jev. That is a configuration change. `checker: null` removes the judge as well and is for development only.

## Status

Sub-projects 2 to 6 (quick mode app, long mode, social, hook layer, business layer) are specified one at a time in `docs/superpowers/specs/`.
