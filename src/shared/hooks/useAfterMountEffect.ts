import { useEffect, useRef } from 'react'

export const useAfterMountEffect = <T extends unknown[]>(callback: () => void, dependencies: T) => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isFirstRender.current) {
      callback()
    } else {
      isFirstRender.current = false
    }
  }, dependencies)
}
