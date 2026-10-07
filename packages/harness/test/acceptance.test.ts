import { describe, expect, test } from 'bun:test'
import { EvaluatorError, type CheckResult, type EventChecker, type GeneratedEvent } from '@stc/sim-core'
import { meetsTarget, runVerifierAcceptance } from '../src/acceptance'
import type { LabeledEvent } from '../src/inject'

const event = {} as GeneratedEvent
const set: LabeledEvent[] = [
  ...Array.from({ length: 10 }, () => ({ event, contradicts: true })),
  ...Array.from({ length: 10 }, () => ({ event, contradicts: false })),
]
const result = (ok: boolean): CheckResult => ({ verify: { ok, problems: ok ? [] : ['x'] }, judge: { safe: true, onTone: true, funnyScore: 3 } })
const checkerFrom = (decide: (i: number) => boolean | Error): EventChecker => {
  let i = 0
  return {
    async check() {
      const d = decide(i++)
      if (d instanceof Error) throw d
      return result(!d)
    },
  }
}

describe('runVerifierAcceptance', () => {
  test('a perfect checker has full recall and no false positives', async () => {
    const r = await runVerifierAcceptance(checkerFrom((i) => i < 10), set)
    expect(r).toMatchObject({ recall: 1, falsePositiveRate: 0, truePositives: 10, trueNegatives: 10 })
    expect(meetsTarget(r)).toBe(true)
  })

  test('a checker that flags everything fails on false positives', async () => {
    const r = await runVerifierAcceptance(checkerFrom(() => true), set)
    expect(r).toMatchObject({ recall: 1, falsePositiveRate: 1 })
    expect(meetsTarget(r)).toBe(false)
  })

  test('a checker that flags nothing fails on recall', async () => {
    const r = await runVerifierAcceptance(checkerFrom(() => false), set)
    expect(r).toMatchObject({ recall: 0, falsePositiveRate: 0, falseNegatives: 10 })
    expect(meetsTarget(r)).toBe(false)
  })

  test('9 of 10 caught and 1 of 10 false alarm sits exactly on the target', async () => {
    const r = await runVerifierAcceptance(checkerFrom((i) => i < 9 || i === 10), set)
    expect(r).toMatchObject({ recall: 0.9, falsePositiveRate: 0.1 })
    expect(meetsTarget(r)).toBe(true)
  })

  test('checker errors are counted and block a pass', async () => {
    const r = await runVerifierAcceptance(checkerFrom((i) => (i === 3 ? new EvaluatorError('down') : i < 10)), set)
    expect(r.checkerErrors).toBe(1)
    expect(meetsTarget(r)).toBe(false)
  })

  test('an empty set gives zeros, not NaN', async () => {
    const r = await runVerifierAcceptance(checkerFrom(() => false), [])
    expect(r).toMatchObject({ total: 0, recall: 0, falsePositiveRate: 0 })
  })
})

describe('checker errors do not count as answers (final review, finding 5)', () => {
  test('an error on a clean event is excluded from the false-positive rate', async () => {
    const clean: LabeledEvent[] = Array.from({ length: 10 }, () => ({ event, contradicts: false }))
    const r = await runVerifierAcceptance(checkerFrom((i) => (i === 0 ? new EvaluatorError('down') : false)), clean)
    expect(r).toMatchObject({ checkerErrors: 1, trueNegatives: 9, falsePositives: 0 })
  })
})
