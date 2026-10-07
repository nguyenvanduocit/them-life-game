import type { EventRequest, TextSource } from './text-source'

export class GatewayError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    /** Seconds from a Retry-After header, when the gateway sent one. */
    readonly retryAfter?: number,
  ) {
    super(message)
  }
}

export interface GatewayClientOptions {
  /** Base URL of the gateway, for example https://gateway.example.com */
  url: string
  /** Anonymous per-install token, 16 or more characters. */
  deviceToken: string
  /** True only after the player has accepted AI processing. */
  consent: () => boolean
  fetch?: typeof fetch
}

/** TextSource that asks the text gateway. Failures throw GatewayError so the pipeline can fall back. */
export function createGatewayTextSource(options: GatewayClientOptions): TextSource {
  const doFetch = options.fetch ?? fetch
  return {
    async generate(request: EventRequest, signal?: AbortSignal) {
      const response = await doFetch(`${options.url.replace(/\/$/, '')}/event`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ consent: options.consent(), deviceToken: options.deviceToken, request }),
        signal,
      })
      const body = (await response.json().catch(() => ({}))) as { event?: unknown; error?: string }
      if (!response.ok) {
        const retry = Number(response.headers.get('retry-after'))
        throw new GatewayError(`Gateway answered ${response.status}`, response.status, body.error ?? 'unknown', Number.isFinite(retry) && retry > 0 ? retry : undefined)
      }
      return body.event
    },
  }
}
