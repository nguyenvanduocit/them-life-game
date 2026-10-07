import { describe, expect, test } from 'bun:test'
import { readConfig } from '../src/config'

describe('readConfig (review finding 6)', () => {
  test('applies defaults when only the model is set', () => {
    expect(readConfig({ TEXT_MODEL: 'provider/model' })).toEqual({ model: 'provider/model', port: 8787, dailyBudget: 400, globalDailyBudget: 20000 })
  })

  test('reads explicit numbers', () => {
    expect(readConfig({ TEXT_MODEL: 'm', PORT: '9000', DAILY_BUDGET: '50', GLOBAL_DAILY_BUDGET: '1000' })).toMatchObject({ port: 9000, dailyBudget: 50, globalDailyBudget: 1000 })
  })

  test('refuses to start without a model', () => {
    expect(() => readConfig({})).toThrow('TEXT_MODEL')
  })

  test('refuses numbers that would silently switch a limit off', () => {
    for (const bad of ['abc', '400/day', '0', '-5', '1.5', '']) {
      expect(() => readConfig({ TEXT_MODEL: 'm', DAILY_BUDGET: bad })).toThrow('DAILY_BUDGET')
    }
    expect(() => readConfig({ TEXT_MODEL: 'm', GLOBAL_DAILY_BUDGET: 'NaN' })).toThrow('GLOBAL_DAILY_BUDGET')
  })

  test('refuses a port outside 1..65535', () => {
    expect(() => readConfig({ TEXT_MODEL: 'm', PORT: '70000' })).toThrow('PORT')
  })
})
