import { useEffect, useState } from 'react'

export const useThrottle = <V>(value: V, timeout = 3000) => {
  const [throttledValue, setThrottledValue] = useState<V>(value)
  const [lastUpdated, setLastUpdated] = useState(Date.now())

  useEffect(() => {
    const timeSinceUpdate = Date.now() - lastUpdated
    let timerId = setTimeout(() => {
      setThrottledValue(value)
      setLastUpdated(Date.now())
    }, timeout - timeSinceUpdate)

    return () => clearTimeout(timerId)
  }, [value, timeout, lastUpdated])

  return throttledValue
}
