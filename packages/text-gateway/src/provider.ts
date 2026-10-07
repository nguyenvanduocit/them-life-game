import { generatedEventSchema, type EventRequest, type TextSource } from '@stc/sim-core'
import { generateObject } from 'ai'
import { buildUserPrompt, SYSTEM_PROMPT } from './prompt'

export type GenerateFn = (options: { model: string; system: string; prompt: string; abortSignal?: AbortSignal }) => Promise<{ object: unknown }>

const liveGenerate: GenerateFn = async (options) => {
  const result = await generateObject({ ...options, schema: generatedEventSchema })
  return { object: result.object }
}

/**
 * The real text source: one structured-output call to the model named by
 * `model` (an id the AI SDK's configured provider can resolve).
 */
export function createAiSdkTextSource(options: { model: string; generate?: GenerateFn }): TextSource {
  const generate = options.generate ?? liveGenerate
  return {
    async generate(request: EventRequest, signal?: AbortSignal) {
      const result = await generate({ model: options.model, system: SYSTEM_PROMPT, prompt: buildUserPrompt(request), abortSignal: signal })
      return result.object
    },
  }
}
