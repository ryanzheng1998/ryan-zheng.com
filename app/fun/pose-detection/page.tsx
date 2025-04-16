'use client'
import { useEffect } from 'react'
import { onMount } from './onMount'

export default function Page() {
  useEffect(() => {
    onMount()
  }, [])

  return (
    <div>
      <video
        id="webcam"
        autoPlay
        className="h-screen w-screen -scale-x-100 bg-black"
      />
    </div>
  )
}
