/**
 * Executes a promise with a timeout
 * @param promise The promise to execute
 * @param timeoutMs Timeout in milliseconds
 */
export async function fetchWithTimeout<T>(promise: Promise<T>, timeoutMs = 10000): Promise<T> {
    let timeoutId: NodeJS.Timeout
  
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(`Operation timed out after ${timeoutMs}ms`))
      }, timeoutMs)
    })
  
    return Promise.race([promise, timeoutPromise]).finally(() => {
      clearTimeout(timeoutId)
    }) as Promise<T>
  }
  
  /**
   * Retries a function multiple times with exponential backoff
   * @param fn The function to retry
   * @param maxRetries Maximum number of retries
   * @param initialDelayMs Initial delay in milliseconds
   */
  export async function retry<T>(fn: () => Promise<T>, maxRetries = 3, initialDelayMs = 500): Promise<T> {
    let lastError: Error
  
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error as Error
  
        if (attempt < maxRetries) {
          const delayMs = initialDelayMs * Math.pow(2, attempt)
          console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${delayMs}ms`)
          await new Promise((resolve) => setTimeout(resolve, delayMs))
        }
      }
    }
  
    throw lastError!
  }
  