'use client'
import { useEffect } from 'react'
import { set } from '../pose-detection/useStore'

export default function Page() {
  useEffect(() => {
    const main = async () => {
      const webcam = document.getElementById('webcam') as HTMLVideoElement
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })
      webcam.srcObject = stream

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          set({
            width,
            height,
          })
        }
      })

      observer.observe(webcam)

      webcam.onloadedmetadata = () => {
        set({
          webcam,
          videoWidth: webcam.videoWidth,
          videoHeight: webcam.videoHeight,
        })
      }
    }

    main()
  }, [])

  return (
    <div>
      <video
        id="webcam"
        autoPlay
        muted
        className="absolute h-full w-full bg-black"
      />
    </div>
  )
}
