import { describe, expect, test } from 'bun:test'
import { createGatewayTextSource, GatewayError } from '../src/gateway-client'
import type { EventRequest } from '../src/text-source'
import { makeEvent } from './helpers'

const request: EventRequest = {
  stateSummary: 'Gary',
  logTail: [],
  tone: { name: 'standard', maxIntensity: 2 },
  highlight: { index: 0, kind: 'money', stage: 'adult', age: 34 },
  seed: 1,
  attempt: 0,
}

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } })

describe('createGatewayTextSource', () => {
  test('posts the request with consent and the device token and returns the event', async () => {
    const seen: { url: string; body: unknown }[] = []
    const fakeFetch = (async (url: string, init: RequestInit) => {
      seen.push({ url, body: JSON.parse(String(init.body)) })
      return json(200, { event: makeEvent() })
    }) as unknown as typeof fetch
    const source = createGatewayTextSource({ url: 'https://gw.test/', deviceToken: 'device-token-0001', consent: () => true, fetch: fakeFetch })
    expect(await source.generate(request)).toEqual(makeEvent())
    expect(seen[0]).toEqual({ url: 'https://gw.test/event', body: { consent: true, deviceToken: 'device-token-0001', request } })
  })

  test('throws GatewayError with status, code and Retry-After on a 429', async () => {
    const fakeFetch = (async () => json(429, { error: 'rate_limited' }, { 'retry-after': '12' })) as unknown as typeof fetch
    const source = createGatewayTextSource({ url: 'https://gw.test', deviceToken: 'device-token-0001', consent: () => true, fetch: fakeFetch })
    const error = await source.generate(request).catch((e) => e)
    expect(error).toBeInstanceOf(GatewayError)
    expect(error).toMatchObject({ status: 429, code: 'rate_limited', retryAfter: 12 })
  })

  test('survives a non-JSON error body', async () => {
    const fakeFetch = (async () => new Response('Bad Gateway', { status: 502 })) as unknown as typeof fetch
    const source = createGatewayTextSource({ url: 'https://gw.test', deviceToken: 'device-token-0001', consent: () => false, fetch: fakeFetch })
    await expect(source.generate(request)).rejects.toMatchObject({ status: 502, code: 'unknown' })
  })
})
