import { useEffect, useState } from 'react'
import { onTimeUpdate } from './onTimeUpdate'
import { Overlay } from './Overlay'
import { setupWebcam } from './setupWebcam'
import { get, set, useStore } from './useStore'

export const Content = () => {
  const state = useStore()
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    void setupWebcam(controller.signal).catch((error) => {
      if (!controller.signal.aborted)
        setError(
          error instanceof Error ? error.message : 'Unable to start camera.',
        )
    })
    return () => controller.abort()
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
      {error && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-black p-8 text-white">
          <div className="max-w-md">
            <h1 className="text-2xl">Camera unavailable / 無法使用攝影機</h1>
            <p className="mt-4 text-sm">{error}</p>
            <p className="mt-4 text-sm">
              Check camera permission, then restart the demo. /
              請檢查攝影機權限後重新開始。
            </p>
          </div>
        </div>
      )}
      <div
        style={{ display: state.loading ? undefined : 'none' }}
        className="grid h-full w-full place-items-center bg-black text-6xl text-white"
      >
        Loading...
      </div>
      <div className="h-full w-full -scale-x-100">
        <video
          id="webcam"
          muted
          playsInline
          autoPlay
          className="absolute h-full w-full bg-black"
        />
        <Overlay />
      </div>
    </div>
  )
}
