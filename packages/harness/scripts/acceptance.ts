// Verifier acceptance test against real Jev. Usage: bun run scripts/acceptance.ts
// Needs fixtures/recorded.jsonl (see scripts/record.ts) and Jev credentials in the environment.
import { createJevChecker, createJevEvaluator, createRng } from '@stc/sim-core'
import { readFile } from 'node:fs/promises'
import { DEFAULT_TARGET, buildLabeledSet, meetsTarget, parseRecorded, runVerifierAcceptance } from '../src'

const { events, invalid } = parseRecorded(await readFile(new URL('../fixtures/recorded.jsonl', import.meta.url), 'utf8'))
if (events.length < 20) {
  console.error(`Only ${events.length} valid recorded events (${invalid} invalid). Record at least 100 first.`)
  process.exit(1)
}

const set = buildLabeledSet(events, createRng(2026))
const result = await runVerifierAcceptance(createJevChecker(createJevEvaluator()), set)
console.log(JSON.stringify(result, null, 2))
const ok = meetsTarget(result)
console.log(
  ok
    ? `PASS: recall ${result.recall.toFixed(2)} >= ${DEFAULT_TARGET.minRecall}, false positives ${result.falsePositiveRate.toFixed(2)} <= ${DEFAULT_TARGET.maxFalsePositiveRate}`
    : "FAIL: set CheckConfig.verifier to 'deterministic' (createJevChecker(evaluator, { ...DEFAULT_CHECK_CONFIG, verifier: 'deterministic' })). Jev keeps judging safety, tone and humor; only the text-versus-effects check moves off Jev. This is a configuration change.",
)
process.exit(ok ? 0 : 1)
