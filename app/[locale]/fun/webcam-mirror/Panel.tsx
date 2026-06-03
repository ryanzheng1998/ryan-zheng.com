import { changeVideoDevice } from './changeVideoDevice'
import { useStore } from './useStore'

export const Panel = () => {
  const store = useStore()

  return (
    <div className="fixed left-5 top-5 rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur-md">
      <h1 className="text-xl font-semibold text-gray-800">🎥 Webcam Mirror</h1>

      {store.videoDevices.length === 0 ? (
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
  )
}
