import { useStore } from './useStore'
import { VideoWithStream } from './VideoWithSteam'

export const WebCam = () => {
  const store = useStore()

  if (store.webcamLoading) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-black text-4xl text-white">
        Loading webcam...
      </div>
    )
  }

  if (store.webcamError) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-black text-2xl text-red-400">
        {store.webcamError.message}
      </div>
    )
  }

  if (!store.stream) {
    return <p>Impossible</p>
  }

  return (
    <div className="fixed inset-0 bg-black">
      <VideoWithStream
        id="webcam"
        className="h-full w-full"
        srcObject={store.stream}
      />
    </div>
  )
}
