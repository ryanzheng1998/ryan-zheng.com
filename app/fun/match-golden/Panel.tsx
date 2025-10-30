import { changeGolden } from './actions/changeGolden'
import { changeVideoDevice } from './actions/changeVideoDevice'
import { checkSimilairty } from './actions/checkSimilairty'
import { useStore } from './useStore'

export const Panel = () => {
  const store = useStore()

  if (store.webcamLoading) return <></>
  if (store.webcamError) return <></>

  return (
    <div className="fixed left-5 top-5 grid gap-3 rounded-2xl bg-white/90 p-5 shadow-lg backdrop-blur-md">
      <h1 className="text-xl font-semibold text-gray-800">🎥 Match Golden</h1>

      <p>Similarity {store.similarity * 100}%</p>

      <select
        onChange={(e) => {
          const deviceId = e.target.value
          void changeVideoDevice(deviceId)
        }}
        value={store.selectedDeviceId ?? ''}
        className="mt-4 w-56 rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm transition hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {store.videoDevices.map((x) => (
          <option key={x.deviceId} value={x.deviceId}>
            {x.label || `Camera ${x.deviceId}`}
          </option>
        ))}
      </select>

      <img className="w-64" src={store.golden} alt="Golden Image" />

      <button
        onClick={changeGolden}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Take a Golden Image
      </button>
      <button onClick={checkSimilairty}>Check Similarity</button>
    </div>
  )
}
