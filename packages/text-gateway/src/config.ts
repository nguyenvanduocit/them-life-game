export interface GatewayConfig {
  model: string
  port: number
  /** Requests per device per UTC day. */
  dailyBudget: number
  /** Requests across all devices per UTC day. Bounds spend when device tokens are forged. */
  globalDailyBudget: number
}

function wholeNumber(env: Record<string, string | undefined>, name: string, fallback: number, max: number): number {
  const raw = env[name]
  if (raw === undefined) return fallback
  const n = Number(raw)
  if (!/^\d+$/.test(raw) || n < 1 || n > max) throw new Error(`${name} must be a whole number from 1 to ${max}, got "${raw}"`)
  return n
}

/** Reads and validates the environment. A bad value stops the server instead of silently switching a limit off. */
export function readConfig(env: Record<string, string | undefined>): GatewayConfig {
  const model = env.TEXT_MODEL?.trim()
  if (!model) throw new Error('TEXT_MODEL is required: the model id the AI SDK provider should use')
  return {
    model,
    port: wholeNumber(env, 'PORT', 8787, 65535),
    dailyBudget: wholeNumber(env, 'DAILY_BUDGET', 400, 1_000_000),
    globalDailyBudget: wholeNumber(env, 'GLOBAL_DAILY_BUDGET', 20_000, 100_000_000),
  }
}
