import { ref, customRef, type Ref, type UnwrapRef } from "vue";

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
