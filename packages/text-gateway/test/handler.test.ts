import { describe, expect, test } from 'bun:test'
import { createGatewayTextSource, type EventRequest, type GeneratedEvent, type TextSource } from '@stc/sim-core'
import { createHandler, type HandlerDeps } from '../src/handler'
import { createCache, createDailyBudget, createRateLimiter } from '../src/limits'

const event: GeneratedEvent = {
  narration: 'A pigeon files a complaint.',
  intensity: 1,
  choices: [
    { id: 'c1', label: 'Read it.', tags: ['kind'], outcome: { narration: 'It is in pigeon.', effects: [{ kind: 'stat', stat: 'happiness', delta: 2 }] } },
    { id: 'c2', label: 'Ignore it.', tags: ['lazy'], outcome: { narration: 'It files another.', effects: [] } },
  ],
}

const request: EventRequest = {
  stateSummary: 'Gary Pembrook, age 34, adult.',
  logTail: [],
  tone: { name: 'standard', maxIntensity: 2 },
  highlight: { index: 6, kind: 'money', stage: 'adult', age: 34 },
  seed: 1,
  attempt: 0,
}
const token = 'device-token-0001'

function setup(over: Partial<HandlerDeps> = {}, source?: TextSource) {
  const calls: EventRequest[] = []
  const text: TextSource = source ?? {
    async generate(r) {
      calls.push(r)
      return event
    },
  }
  const deps: HandlerDeps = {
    source: text,
    rateLimiter: createRateLimiter({ max: 100, windowMs: 60_000 }),
    budget: createDailyBudget({ maxPerDay: 100 }),
    cache: createCache<GeneratedEvent>(),
    ...over,
  }
  const handler = createHandler(deps)
  const post = (body: unknown, init: RequestInit = {}) =>
    handler(new Request('http://gw.test/event', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body), ...init }))
  return { post, handler, calls }
}

const valid = (over: Record<string, unknown> = {}) => ({ consent: true, deviceToken: token, request, ...over })

describe('POST /event', () => {
  test('returns the event for a valid, consented request and calls the provider once', async () => {
    const { post, calls } = setup()
    const res = await post(valid())
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ event })
    expect(calls).toHaveLength(1)
  })

  test('answers 404 for other paths and 405 for other methods', async () => {
    const { handler } = setup()
    expect((await handler(new Request('http://gw.test/other', { method: 'POST' }))).status).toBe(404)
    const get = await handler(new Request('http://gw.test/event'))
    expect(get.status).toBe(405)
    expect(get.headers.get('allow')).toBe('POST')
  })

  test('rejects invalid JSON, wrong shapes and short device tokens with 400, never calling the provider', async () => {
    const { post, calls } = setup()
    expect((await post('{not json')).status).toBe(400)
    expect((await post({ consent: true })).status).toBe(400)
    expect((await post(valid({ deviceToken: 'short' }))).status).toBe(400)
    expect((await post(valid({ request: { ...request, attempt: 99 } }))).status).toBe(400)
    expect(calls).toHaveLength(0)
  })

  test('without consent it answers 403 and spends nothing', async () => {
    const { post, calls } = setup()
    const res = await post(valid({ consent: false }))
    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: 'consent_required' })
    expect(calls).toHaveLength(0)
  })

  test('an oversized body gets 413 before any parsing', async () => {
    const { post, calls } = setup()
    const res = await post(valid({ request: { ...request, stateSummary: 'x'.repeat(30_000) } }))
    expect(res.status).toBe(413)
    expect(calls).toHaveLength(0)
  })

  test('rate limiting answers 429 with Retry-After', async () => {
    const { post } = setup({ rateLimiter: createRateLimiter({ max: 1, windowMs: 60_000 }) })
    expect((await post(valid())).status).toBe(200)
    const res = await post(valid({ request: { ...request, seed: 2 } }))
    expect(res.status).toBe(429)
    expect(Number(res.headers.get('retry-after'))).toBeGreaterThan(0)
  })

  test('an identical request is served from the cache without a second model call or budget spend', async () => {
    const { post, calls } = setup({ budget: createDailyBudget({ maxPerDay: 1 }) })
    await post(valid())
    const again = await post(valid())
    expect(again.status).toBe(200)
    expect(await again.json()).toEqual({ event, cached: true })
    expect(calls).toHaveLength(1)
  })

  test('the daily budget answers 429 for new requests once used up', async () => {
    const { post } = setup({ budget: createDailyBudget({ maxPerDay: 1 }) })
    await post(valid())
    const res = await post(valid({ request: { ...request, seed: 2 } }))
    expect(res.status).toBe(429)
    expect(await res.json()).toEqual({ error: 'daily_budget' })
  })

  test('a failing provider answers 502 provider_unavailable', async () => {
    const { post } = setup({}, { generate: async () => { throw new Error('quota') } })
    const res = await post(valid())
    expect(res.status).toBe(502)
    expect(await res.json()).toEqual({ error: 'provider_unavailable' })
  })

  test('junk model output answers 502 invalid_model_output and is not cached', async () => {
    let calls = 0
    const { post } = setup({}, { generate: async () => { calls++; return { narration: 'only this' } } })
    expect((await (await post(valid())).json())).toEqual({ error: 'invalid_model_output' })
    await post(valid())
    expect(calls).toBe(2)
  })
})

describe('hardening from review (findings 2, 3, 4, 10)', () => {
  test('a chunked body with no Content-Length is cut off at the limit instead of being buffered whole', async () => {
    const { handler, calls } = setup()
    let pulled = 0
    const encoder = new TextEncoder()
    const body = new ReadableStream({
      pull(controller) {
        if (pulled >= 40) return controller.close()
        pulled++
        controller.enqueue(encoder.encode('x'.repeat(5000)))
      },
    })
    const res = await handler(new Request('http://gw.test/event', { method: 'POST', body, duplex: 'half' } as RequestInit))
    expect(res.status).toBe(413)
    expect(pulled).toBeLessThan(10)
    expect(calls).toHaveLength(0)
  })

  test('a global daily budget stops spend across many device tokens', async () => {
    const { post } = setup({ globalBudget: createDailyBudget({ maxPerDay: 2 }) })
    const fresh = (n: number) => valid({ deviceToken: `device-token-${String(n).padStart(4, '0')}`, request: { ...request, seed: n } })
    expect((await post(fresh(1))).status).toBe(200)
    expect((await post(fresh(2))).status).toBe(200)
    const res = await post(fresh(3))
    expect(res.status).toBe(429)
    expect(await res.json()).toEqual({ error: 'service_busy' })
  })

  test('a provider that ignores the abort signal is cut off by the gateway timeout', async () => {
    const { post } = setup({ providerTimeoutMs: 30 }, { generate: () => new Promise<never>(() => {}) })
    const started = Date.now()
    const res = await post(valid())
    expect(res.status).toBe(502)
    expect(Date.now() - started).toBeLessThan(1000)
  })

  test('the model call is aborted when the client disconnects', async () => {
    let sawAbort = false
    const source: TextSource = {
      generate: (_r, signal) =>
        new Promise((_resolve, reject) => {
          signal?.addEventListener('abort', () => {
            sawAbort = true
            reject(new Error('aborted'))
          })
        }),
    }
    const { handler } = setup({}, source)
    const controller = new AbortController()
    const pending = handler(new Request('http://gw.test/event', { method: 'POST', body: JSON.stringify(valid()), signal: controller.signal }))
    await new Promise((r) => setTimeout(r, 20))
    controller.abort()
    expect((await pending).status).toBe(502)
    expect(sawAbort).toBe(true)
  })
})

describe('over real HTTP with the shipped client', () => {
  test('createGatewayTextSource gets an event from a running gateway', async () => {
    const { handler } = setup()
    const server = Bun.serve({ port: 0, fetch: handler })
    try {
      const source = createGatewayTextSource({ url: `http://localhost:${server.port}`, deviceToken: token, consent: () => true })
      expect(await source.generate(request)).toEqual(event)
      const refused = createGatewayTextSource({ url: `http://localhost:${server.port}`, deviceToken: token, consent: () => false })
      await expect(refused.generate(request)).rejects.toMatchObject({ status: 403, code: 'consent_required' })
    } finally {
      await server.stop(true)
    }
  })
})
