import { useEffect, useState } from 'react'

function useDebounce<T>(value: T): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), 800)

    return () => {
      clearTimeout(timer)
    }
  }, [value])

  return debouncedValue
}

export default useDebounce
