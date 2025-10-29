'use client'
import { webcamSnap } from '@/side-effects/webcamSnap'
import { useStore } from './useStore'
import { Webcam } from './Webcam'

export default function Page() {
  const store = useStore()
  return (
    <>
      <Webcam />
      <div className="fixed left-0 top-0 m-5 grid place-items-center gap-5 rounded bg-white p-5">
        <p className="text-5xl">Similarity: {10}%</p>
        <img
          className="h-64 w-64 object-cover"
          src={store.golden ?? ''}
          alt="Golden Image"
        />
        <button
          onClick={async () => {
            const base64 = await webcamSnap()
            if (base64 instanceof Error) {
              alert(base64.message)
              return
            }
            useStore.setState({ golden: base64 })
          }}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Take a Golden Image
        </button>
      </div>
    </>
  )
}
