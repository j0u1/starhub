export const useDebounce = <T>(value: Ref<T>, delay = 300) => {
  const debouncedValue = ref(value.value)

  watch(value, (newValue) => {
    const handler = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)

    // Очистка предыдущего таймера (аналог return в useEffect)
    onWatcherCleanup(() => clearTimeout(handler))
  })

  return debouncedValue
}