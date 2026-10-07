// Records real model output for the acceptance test and the funny-rate rating.
// Live: needs a running gateway. Usage: GATEWAY_URL=http://localhost:8787 bun run scripts/record.ts 100
import { createGatewayTextSource, logTail, newLife, lifeState, planLife, stateSummary, stepLife } from '@stc/sim-core'
import { mkdir, writeFile } from 'node:fs/promises'

const url = process.env.GATEWAY_URL
const count = Number(process.argv[2] ?? 100)
if (!url) {
  console.error('GATEWAY_URL is required, for example http://localhost:8787')
  process.exit(1)
}

const source = createGatewayTextSource({ url, deviceToken: `record-${crypto.randomUUID()}`, consent: () => true })
const lines: string[] = []
let failures = 0

for (let i = 0; i < count; i++) {
  const plan = planLife(i)
  const highlight = plan[i % (plan.length - 1)]!
  let snapshot = newLife({ name: `Subject ${i}` })
  snapshot = stepLife(snapshot, { type: 'SKIP', toAge: highlight.age })
  const state = lifeState(snapshot)
  try {
    const event = await source.generate({ stateSummary: stateSummary(state), logTail: logTail(state), tone: { name: 'standard', maxIntensity: 3 }, highlight, seed: i, attempt: 0 })
    lines.push(JSON.stringify(event))
  } catch (e) {
    failures++
    console.error(`event ${i} failed: ${e instanceof Error ? e.message : e}`)
  }
}

await mkdir(new URL('../fixtures/', import.meta.url), { recursive: true })
await writeFile(new URL('../fixtures/recorded.jsonl', import.meta.url), lines.join('\n') + '\n')
console.log(`Recorded ${lines.length} events (${failures} failed). Review them by hand before using them as the clean half of the acceptance set.`)
