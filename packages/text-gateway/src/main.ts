import { readConfig } from './config'
import { createHandler } from './handler'
import { createCache, createDailyBudget, createRateLimiter } from './limits'
import { createAiSdkTextSource } from './provider'

let config: ReturnType<typeof readConfig>
try {
  config = readConfig(process.env)
} catch (e) {
  console.error(e instanceof Error ? e.message : e)
  console.error('Model credentials come from the environment, never from the app.')
  process.exit(1)
}

const MAX_BODY_BYTES = 20_000

const handler = createHandler({
  source: createAiSdkTextSource({ model: config.model }),
  rateLimiter: createRateLimiter({ max: 30, windowMs: 60_000 }),
  budget: createDailyBudget({ maxPerDay: config.dailyBudget }),
  globalBudget: createDailyBudget({ maxPerDay: config.globalDailyBudget }),
  cache: createCache(500),
  maxBodyBytes: MAX_BODY_BYTES,
})

const server = Bun.serve({ port: config.port, fetch: handler, maxRequestBodySize: MAX_BODY_BYTES * 2 })
console.log(`Text gateway listening on ${server.url}`)
