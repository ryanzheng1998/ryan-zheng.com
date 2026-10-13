'use client'
import { useState } from 'react'
import { DemoIntro } from '@/components/DemoIntro'
import { orb } from './orb'
import { set, useStore } from './useStore'

export default function Page() {
  const store = useStore()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  return (
    <main className="demo-surface">
      <div className="demo-content">
        <DemoIntro id="orb-detect" />
        <label className="demo-upload">
          <span>Choose an image / 選擇一張圖片</span>
          <input
            type="file"
            accept="image/*"
            disabled={busy}
            onChange={async (e) => {
              const file = e.currentTarget.files?.[0]
              if (!file) return
              setBusy(true)
              setError('')
              try {
                const orbResult = await orb(file)
                if (store.imageUrl) URL.revokeObjectURL(store.imageUrl)
                set({ orbResult, imageUrl: URL.createObjectURL(file) })
              } catch (error) {
                setError(
                  error instanceof Error
                    ? error.message
                    : 'Unable to detect features.',
                )
              } finally {
                setBusy(false)
              }
            }}
          />
        </label>
        {busy && (
          <p className="demo-status" role="status">
            Finding features… / 特徵點偵測中…
          </p>
        )}
        {error && (
          <p className="demo-error" role="alert">
            {error}
          </p>
        )}
        {store.orbResult && (
          <p className="demo-status" role="status">
            {store.orbResult.keypoints.length} feature points / 特徵點
          </p>
        )}
        <div className="image-workspace">
          {!store.imageUrl ? (
            <p className="demo-status">
              Choose an image to see its feature points. /
              選擇圖片後查看特徵點。
            </p>
          ) : (
            <div className="relative inline-block">
              <img
                src={store.imageUrl}
                alt="Uploaded image with ORB features"
                className="block max-w-none"
                draggable={false}
              />
              {store.orbResult?.keypoints.map((point, index) => (
                <div
                  key={index}
                  className="pointer-events-none absolute h-1.5 w-1.5 rounded-full border border-red-500 bg-red-500/60"
                  style={{ left: point.x - 3, top: point.y - 3 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
