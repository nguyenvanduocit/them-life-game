import { callWithDeadline, eventRequestSchema, generatedEventSchema, type GeneratedEvent, type TextSource } from '@stc/sim-core'
import { z } from 'zod'
import type { createCache, createDailyBudget, createRateLimiter } from './limits'

const bodySchema = z.object({
  consent: z.boolean(),
  deviceToken: z.string().min(16).max(200),
  request: eventRequestSchema,
})

export interface HandlerDeps {
  source: TextSource
  rateLimiter: ReturnType<typeof createRateLimiter>
  budget: ReturnType<typeof createDailyBudget>
  /** Optional cap across all devices. Device tokens are self-chosen, so this is what bounds total spend. */
  globalBudget?: ReturnType<typeof createDailyBudget>
  cache: ReturnType<typeof createCache<GeneratedEvent>>
  /** Default 20000 bytes. */
  maxBodyBytes?: number
  /** Default 7000 ms, kept below the client's 8000 ms so abandoned calls are not paid for twice. */
  providerTimeoutMs?: number
}

const json = (status: number, body: unknown, headers: Record<string, string> = {}): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } })

/** Reads at most maxBytes. Returns null as soon as the body is too large, without buffering the rest. */
async function readBounded(req: Request, maxBytes: number): Promise<string | null> {
  if (!req.body) return ''
  const reader = req.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > maxBytes) {
      await reader.cancel().catch(() => {})
      return null
    }
    chunks.push(value)
  }
  return new Blob(chunks).text()
}

async function cacheKey(request: unknown): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(request))
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

/** POST /event. Consent is checked before anything that costs money. */
export function createHandler(deps: HandlerDeps): (request: Request) => Promise<Response> {
  const maxBytes = deps.maxBodyBytes ?? 20_000
  const providerTimeoutMs = deps.providerTimeoutMs ?? 7000

  return async (req) => {
    const url = new URL(req.url)
    if (url.pathname !== '/event') return json(404, { error: 'not_found' })
    if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' }, { allow: 'POST' })

    const declared = Number(req.headers.get('content-length') ?? 0)
    if (declared > maxBytes) return json(413, { error: 'body_too_large' })
    const text = await readBounded(req, maxBytes)
    if (text === null) return json(413, { error: 'body_too_large' })

    let raw: unknown
    try {
      raw = JSON.parse(text)
    } catch {
      return json(400, { error: 'invalid_json' })
    }
    const body = bodySchema.safeParse(raw)
    if (!body.success) return json(400, { error: 'invalid_request' })

    if (!body.data.consent) return json(403, { error: 'consent_required' })

    const rate = deps.rateLimiter.check(body.data.deviceToken)
    if (!rate.allowed) return json(429, { error: 'rate_limited' }, { 'retry-after': String(Math.max(1, Math.ceil(rate.retryAfterMs / 1000))) })

    const key = await cacheKey(body.data.request)
    const cached = deps.cache.get(key)
    if (cached) return json(200, { event: cached, cached: true })

    if (!deps.budget.consume(body.data.deviceToken)) return json(429, { error: 'daily_budget' }, { 'retry-after': '3600' })
    if (deps.globalBudget && !deps.globalBudget.consume('global')) return json(429, { error: 'service_busy' }, { 'retry-after': '3600' })

    let produced: unknown
    try {
      produced = await callWithDeadline((signal) => deps.source.generate(body.data.request, signal), providerTimeoutMs, req.signal)
    } catch {
      return json(502, { error: 'provider_unavailable' })
    }
    const event = generatedEventSchema.safeParse(produced)
    if (!event.success) return json(502, { error: 'invalid_model_output' })

    deps.cache.set(key, event.data)
    return json(200, { event: event.data })
  }
}
