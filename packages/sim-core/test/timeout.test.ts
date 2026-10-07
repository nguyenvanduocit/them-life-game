import { describe, expect, test } from 'bun:test'
import { callWithDeadline } from '../src/timeout'

describe('callWithDeadline', () => {
  test('returns the value when the call finishes in time', async () => {
    expect(await callWithDeadline(async () => 'ok', 1000)).toBe('ok')
  })

  test('rejects at the deadline even when the call ignores the signal and never settles', async () => {
    const started = Date.now()
    await expect(callWithDeadline(() => new Promise<never>(() => {}), 30)).rejects.toBeDefined()
    expect(Date.now() - started).toBeLessThan(1000)
  })

  test('hands the call a signal that aborts at the deadline', async () => {
    let seen: AbortSignal | undefined
    await callWithDeadline((signal) => {
      seen = signal
      return new Promise<never>(() => {})
    }, 20).catch(() => {})
    expect(seen?.aborted).toBe(true)
  })

  test('rejects at once when the outer signal is already aborted, without starting the call', async () => {
    const controller = new AbortController()
    controller.abort(new Error('caller left'))
    let started = false
    await expect(callWithDeadline(async () => { started = true }, 1000, controller.signal)).rejects.toThrow('caller left')
    expect(started).toBe(false)
  })

  test('rejects when the outer signal aborts mid-call', async () => {
    const controller = new AbortController()
    const pending = callWithDeadline(() => new Promise<never>(() => {}), 5000, controller.signal)
    controller.abort(new Error('caller left'))
    await expect(pending).rejects.toThrow('caller left')
  })

  test('propagates a rejection and a synchronous throw from the call', async () => {
    await expect(callWithDeadline(async () => { throw new Error('boom') }, 1000)).rejects.toThrow('boom')
    await expect(callWithDeadline(() => { throw new Error('sync boom') }, 1000)).rejects.toThrow('sync boom')
  })
})
