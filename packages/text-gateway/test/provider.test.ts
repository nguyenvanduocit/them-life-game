import { describe, expect, test } from 'bun:test'
import type { EventRequest } from '@stc/sim-core'
import { createAiSdkTextSource, type GenerateFn } from '../src/provider'

const request: EventRequest = {
  stateSummary: 'Gary',
  logTail: [],
  tone: { name: 'standard', maxIntensity: 2 },
  highlight: { index: 0, kind: 'work', stage: 'adult', age: 30 },
  seed: 1,
  attempt: 0,
}

describe('createAiSdkTextSource', () => {
  test('sends the configured model with the system and user prompts and returns the object', async () => {
    let seen: Parameters<GenerateFn>[0] | undefined
    const generate: GenerateFn = async (o) => {
      seen = o
      return { object: { ok: true } }
    }
    const result = await createAiSdkTextSource({ model: 'provider/model-id', generate }).generate(request)
    expect(result).toEqual({ ok: true })
    expect(seen?.model).toBe('provider/model-id')
    expect(seen?.system).toContain('Subject to Change')
    expect(seen?.prompt).toContain('work at age 30')
  })

  test('lets provider errors propagate so the handler can answer 502', async () => {
    const generate: GenerateFn = async () => {
      throw new Error('quota')
    }
    await expect(createAiSdkTextSource({ model: 'm', generate }).generate(request)).rejects.toThrow('quota')
  })
})
