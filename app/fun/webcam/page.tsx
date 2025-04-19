'use client'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    const main = async () => {
      const webcam = document.getElementById('webcam') as HTMLVideoElement
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })
      webcam.srcObject = stream
    }

    main()
  }, [])
  return (
    <div>
      <video id="webcam" autoPlay className="absolute h-full w-full bg-black" />
    </div>
  )
}
