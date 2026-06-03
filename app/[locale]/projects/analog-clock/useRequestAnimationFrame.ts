import React, { useEffect } from 'react'

export const useRequestAnimationFrame = (callback: (time: number) => void) => {
  const requestRef = React.useRef<number>(0)

  const step = (time: number) => {
    callback(time)
    requestRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(step)
    return () => {
      if (requestRef.current === undefined) return
      cancelAnimationFrame(requestRef.current)
    }
  })
}
