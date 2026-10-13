'use client'
import { useState } from 'react'
import { DemoIntro } from '@/components/DemoIntro'
import { fileUpload } from './fileUpload'
import { useStore } from './useStore'

export default function Page() {
  const store = useStore()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const width = Math.max(600, ...store.images.map((image) => image.imageWidth))
  const height = Math.max(
    320,
    ...store.images.map((image) => image.imageHeight),
  )
  return (
    <main className="demo-surface">
      <div className="demo-content">
        <DemoIntro id="template-match" />
        <label className="demo-upload">
          <span>Choose two or more images / 選擇兩張以上的圖片</span>
          <input
            type="file"
            accept="image/*"
            multiple
            disabled={busy}
            onChange={async (e) => {
              setBusy(true)
              setError('')
              try {
                await fileUpload(e)
              } catch (error) {
                setError(
                  error instanceof Error
                    ? error.message
                    : 'Unable to process images.',
                )
              } finally {
                setBusy(false)
              }
            }}
          />
        </label>
        {busy && (
          <p className="demo-status" role="status">
            Comparing images… / 圖片比對中…
          </p>
        )}
        {error && (
          <p className="demo-error" role="alert">
            {error}
          </p>
        )}
        <div className="image-workspace" aria-label="Image comparison result">
          {!store.images.length ? (
            <p className="demo-status">
              Your comparison will appear here. / 比對結果會顯示在這裡。
            </p>
          ) : (
            <div className="relative" style={{ width, height }}>
              {store.images.map((image, index) => (
                <img
                  key={image.imageUrl}
                  src={image.imageUrl}
                  alt={
                    index === 0
                      ? 'Reference image'
                      : `Comparison image ${index}`
                  }
                  className="absolute left-0 top-0 opacity-50"
                  width={image.imageWidth}
                  height={image.imageHeight}
                  style={{ transform: image.transform, transformOrigin: '0 0' }}
                  draggable={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
