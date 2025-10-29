'use client'
import { useEffect } from 'react'
import { changeVideoDevice } from './changeVideoDevice'
import { initDeviceList } from './initDeviceList'
import { useStore } from './useStore'
import { VideoWithStream } from './VideoWithSteam'

export default function Page() {
  const store = useStore()

  useEffect(() => {
    initDeviceList()
  }, [])

  const noDevices = store.videoDevices.length === 0

  return (
    <div className="relative h-screen w-screen bg-black">
      {/* Loading / Error States */}
      {store.webcamLoading && (
        <div className="absolute inset-0 grid place-items-center bg-black text-4xl text-white">
          Loading webcam...
        </div>
      )}
      {store.webcamError && (
        <div className="absolute inset-0 grid place-items-center bg-black text-2xl text-red-400">
          {store.webcamError.message}
        </div>
      )}

      {/* Video Feed */}
      {store.stream && (
        <div className="h-full w-full -scale-x-100">
          <VideoWithStream
            id="webcam"
            className="absolute h-full w-full bg-black object-cover"
            srcObject={store.stream}
          />
        </div>
      )}

      {/* Control Panel */}
      <div className="fixed left-5 top-5 rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur-md">
        <h1 className="text-xl font-semibold text-gray-800">
          🎥 Webcam Mirror
        </h1>

        {noDevices ? (
          <div className="mt-4 rounded-lg bg-gray-100 px-4 py-3 text-gray-500">
            No webcam detected
          </div>
        ) : (
          <select
            onChange={(e) => {
              const deviceId = e.target.value
              void changeVideoDevice(deviceId)
            }}
            className="mt-4 w-56 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm transition hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {store.videoDevices.map((x) => (
              <option key={x.deviceId} value={x.deviceId}>
                {x.label || `Camera ${x.deviceId}`}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  )
}
