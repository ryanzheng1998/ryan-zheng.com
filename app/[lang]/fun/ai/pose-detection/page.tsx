'use client'
import { useEffect } from 'react'
import { Content } from './Content'
import { loadModels } from './loadModels'
import { set, useStore } from './useStore'

export default function Page() {
  const store = useStore()

  useEffect(() => {
    loadModels()
  }, [])

  if (store.warning) {
    return (
      <div className="grid h-screen w-screen place-items-center bg-black px-4">
        <div className="grid w-full max-w-xl place-items-center gap-6 text-center">
          <p className="text-5xl font-bold text-white md:text-6xl">
            ⚠️ Performance Warning
          </p>
          <p className="text-lg text-white md:text-xl">
            Your device may not have enough performance to run this app
            smoothly.
          </p>
          <p className="text-sm text-white text-opacity-70">
            This could be due to limited GPU support, low CPU power, or mobile
            device limitations.
          </p>
          <button
            onClick={() => set({ warning: false })}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-500"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    )
  }

  return <Content />
}
