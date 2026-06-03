import { useEffect } from 'react'
import { onTimeUpdate } from './onTimeUpdate'
import { Overlay } from './Overlay'
import { setupWebcam } from './setupWebcam'
import { get, set, useStore } from './useStore'

export const Content = () => {
  const state = useStore()

  useEffect(() => {
    setupWebcam()
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(onTimeUpdate(performance.now()))

    set({
      animationId: id,
    })

    return () => {
      const id = get().animationId
      cancelAnimationFrame(id)
    }
  }, [])

  return (
    <div className="relative h-screen w-screen">
      <div
        style={{ display: state.loading ? undefined : 'none' }}
        className="grid h-full w-full place-items-center bg-black text-6xl text-white"
      >
        Loading...
      </div>
      <div className="h-full w-full -scale-x-100">
        <video
          id="webcam"
          autoPlay
          className="absolute h-full w-full bg-black"
        />
        <Overlay />
      </div>
    </div>
  )
}
