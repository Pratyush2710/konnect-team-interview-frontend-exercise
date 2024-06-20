import { ref, customRef, type Ref, type UnwrapRef } from "vue";

/**
 * Helper function to debounce  given function by delay
 *
 * @param {Function} fn - The function to debounce.
 * @param {number} delay - The delay in milliseconds before executing the function. Defaults to 0.
 * @returns {Function}
 */
const debounce = (
  fn: (...args: any[]) => void,
  delay = 0
): ((...args: any[]) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

/**
 * Generic debounce method to debounce given fn after a delay
 *
 * @template T - The type of the value stored in the ref.
 * @param {T} initialValue - The initial value of the ref.
 * @param {number} delay - The delay in milliseconds before updating the ref's value.
 */
const useDebouncedRef = <T>(initialValue: T, delay: number): Ref<T> => {
  const state = ref<UnwrapRef<T>>(initialValue as UnwrapRef<T>);
  const debouncedRef = customRef<T>((track, trigger) => ({
    get() {
      track();
      return state.value as T;
    },
    set: debounce((value: T) => {
      state.value = value as any;
      trigger();
    }, delay),
  }));
  return debouncedRef;
};

export default useDebouncedRef;
