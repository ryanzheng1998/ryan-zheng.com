'use client'
import { useEffect } from 'react'
import { HandOverlay } from './HandOverlay'
import { onMount } from './onMount'
import { onTimeUpdate } from './onTimeUpdate'
import { PoseOverlay } from './PoseOverlay'
import { get, set, useStore } from './useStore'

export default function Page() {
  const state = useStore()

  useEffect(() => {
    onMount()
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(onTimeUpdate(performance.now()))

    set({
      animationId: id,
    })

    return () => {
      const id = get().animationId
      cancelAnimationFrame(id)
    }
  }, [])

  const xScale = state.width / state.videoWidth
  const yScale = state.height / state.videoHeight
  const scale = Math.min(xScale, yScale)

  const xOffset = (state.width - state.videoWidth * scale) / 2
  const yOffset = (state.height - state.videoHeight * scale) / 2

  return (
    <div className="relative h-screen w-screen -scale-x-100">
      <video id="webcam" autoPlay className="absolute h-full w-full bg-black" />
      <div className="relative h-full w-full overflow-hidden">
        <PoseOverlay
          landmarks={state.poseLandmarkerResult?.landmarks ?? []}
          width={state.videoWidth}
          height={state.videoHeight}
          scale={scale}
          xOffset={xOffset}
          yOffset={yOffset}
        />
        <HandOverlay
          landmarks={state.handLandmarkerResult?.landmarks ?? []}
          width={state.videoWidth}
          height={state.videoHeight}
          scale={scale}
          xOffset={xOffset}
          yOffset={yOffset}
        />
      </div>
    </div>
  )
}
