import React from 'react'

// when callback return false, stop the animation
export const useRequestAnimationFrame = (
  callback: (timeStamp: number) => boolean,
  dependency: React.DependencyList
) => {
  const animationRef = React.useRef(0)

  const step = (t1: number) => (t2: number) => {
    if (!callback(t2)) return

    animationRef.current = requestAnimationFrame(step(t2))
  }

  React.useEffect(() => {
    animationRef.current = requestAnimationFrame(step(performance.now()))
    return () => cancelAnimationFrame(animationRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency)
}
