import { useEffect } from 'react'
import { enableCam } from './enableCam'
import { useStore } from './useStore'

export const Webcam = () => {
  const store = useStore()

  useEffect(() => {
    enableCam()
  }, [])

  return (
    <div className="relative h-screen w-screen">
      {store.webcamLoading && (
        <div className="grid h-screen w-screen place-items-center bg-black text-6xl text-white">
          Loading...
        </div>
      )}
      {store.webcamError && (
        <div className="grid h-screen w-screen place-items-center bg-black text-white">
          <p className="text-6xl">{store.webcamError.message}</p>
        </div>
      )}
      <div className="h-full w-full -scale-x-100">
        <video
          id="webcam"
          autoPlay
          muted
          className="absolute h-full w-full bg-black"
        />
      </div>
    </div>
  )
}
