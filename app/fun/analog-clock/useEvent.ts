import React from 'react'

export const useEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any
) => {
  React.useEffect(() => {
    window.addEventListener(type, listener)
    return () => window.removeEventListener(type, listener)
  }, [type, listener])
}
