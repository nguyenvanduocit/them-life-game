/**
 * Runs `run` with a signal that aborts at the deadline or when `outer` aborts,
 * and rejects as soon as that happens, even if `run` ignores the signal and
 * never settles. Without the race, a hung call hangs its caller.
 *
 * Built on AbortController and setTimeout only: AbortSignal.any and
 * AbortSignal.timeout are missing from WebViews older than iOS 17.4 and 16.
 */
export function callWithDeadline<T>(run: (signal: AbortSignal) => Promise<T>, ms: number, outer?: AbortSignal): Promise<T> {
  const controller = new AbortController()
  return new Promise<T>((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const cleanup = (): void => {
      clearTimeout(timer)
      outer?.removeEventListener('abort', onOuterAbort)
    }
    const fail = (reason: unknown): void => {
      cleanup()
      controller.abort(reason)
      reject(reason)
    }
    function onOuterAbort(): void {
      fail(outer?.reason ?? new Error('Aborted'))
    }

    if (outer?.aborted) return onOuterAbort()
    outer?.addEventListener('abort', onOuterAbort, { once: true })
    timer = setTimeout(() => fail(new Error(`Timed out after ${ms} ms`)), ms)

    Promise.resolve()
      .then(() => run(controller.signal))
      .then(
        (value) => {
          cleanup()
          resolve(value)
        },
        (error) => {
          cleanup()
          reject(error)
        },
      )
  })
}
