'use client'
import { useEffect, useState } from 'react'
import { Content } from './Content'
import { loadModels } from './loadModels'
import { set, useStore } from './useStore'

export default function Page() {
  const store = useStore()
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    void loadModels().catch((error) => {
      if (active)
        setError(
          error instanceof Error ? error.message : 'Unable to load models.',
        )
    })
    return () => {
      active = false
    }
  }, [])

  if (error)
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f4ec] p-8">
        <div className="max-w-md">
          <h1 className="text-2xl">Model could not load / 模型載入失敗</h1>
          <p className="mt-4 text-sm">{error}</p>
          <p className="mt-4 text-sm">
            Check your connection and GPU support, then restart. / 請檢查網路與
            GPU 支援後重新開始。
          </p>
        </div>
      </div>
    )

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
