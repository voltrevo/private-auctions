/**
 * Creates a function that invokes `func` only once. Subsequent calls to the
 * returned function return the cached result of the first invocation.
 * If the function throws an error, the error is cached and re-thrown on subsequent calls.
 * 
 * @param func The function to restrict to one execution
 * @returns A new function that caches the result of the first call
 */
export function once<T>(func: () => T): () => T {
  let hasBeenCalled = false;
  let result: T;
  let error: Error | undefined;

  return (): T => {
    if (!hasBeenCalled) {
      try {
        result = func();
      } catch (err) {
        error = err instanceof Error ? err : new Error(String(err));
      }
      hasBeenCalled = true;
    }
    
    if (error) {
      throw error;
    }
    
    return result;
  };
}

export default once;
