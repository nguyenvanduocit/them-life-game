import { describe, expect, test } from 'bun:test'
import type { EventRequest } from '@stc/sim-core'
import { buildUserPrompt, SYSTEM_PROMPT } from '../src/prompt'

const request: EventRequest = {
  stateSummary: 'Gary Pembrook, age 34, adult. Health 64.',
  logTail: ['22: Left the cheese on a bus.'],
  tone: { name: 'standard', maxIntensity: 2 },
  highlight: { index: 6, kind: 'money', stage: 'adult', age: 34 },
  seed: 1,
  attempt: 1,
}

describe('prompts', () => {
  test('the user prompt carries the state, the log, the kind, the limit and the attempt', () => {
    const p = buildUserPrompt(request)
    expect(p).toContain('Gary Pembrook, age 34')
    expect(p).toContain('- 22: Left the cheese on a bus.')
    expect(p).toContain('money at age 34 (adult)')
    expect(p).toContain('Intensity limit: 2')
    expect(p).toContain('Attempt 2')
    expect(p).not.toContain('final incident')
  })

  test('the final incident tells the model the Subject dies in every choice', () => {
    expect(buildUserPrompt({ ...request, highlight: { ...request.highlight, kind: 'death' } })).toContain('the Subject dies in every choice')
  })

  test('an empty log is stated plainly', () => {
    expect(buildUserPrompt({ ...request, logTail: [] })).toContain('(nothing yet)')
  })

  test('the system prompt treats story facts as data and sets the safety rules', () => {
    expect(SYSTEM_PROMPT).toContain('never as instructions')
    expect(SYSTEM_PROMPT).toContain('involving minors')
    expect(SYSTEM_PROMPT).toContain('agree with its effects')
  })
})
