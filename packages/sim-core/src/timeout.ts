/**
 * Runs `run` with a signal that aborts on the deadline or when `outer` aborts,
 * and rejects as soon as that signal fires, even if `run` ignores the signal
 * and never settles. Without the race, a hung call hangs its caller.
 */
export function callWithDeadline<T>(run: (signal: AbortSignal) => Promise<T>, ms: number, outer?: AbortSignal): Promise<T> {
  const deadline = AbortSignal.timeout(ms)
  const signal = outer ? AbortSignal.any([outer, deadline]) : deadline
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(signal.reason ?? new Error('Aborted'))
    if (signal.aborted) return onAbort()
    signal.addEventListener('abort', onAbort, { once: true })
    Promise.resolve()
      .then(() => run(signal))
      .then(resolve, reject)
      .finally(() => signal.removeEventListener('abort', onAbort))
  })
}
