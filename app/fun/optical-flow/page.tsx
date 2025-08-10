'use client'
import { useEffect } from 'react'
import { enableCam } from './enableCam'
import { getVideoFit } from './getVideoFit'
import { onTimeUpdate } from './onTimeUpdate'
import { get, set, useStore } from './useStore'

export default function Page() {
  const store = useStore()

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

  useEffect(() => {
    enableCam()
  }, [])

  return (
    <div className="relative h-screen w-screen">
      {store.webcamLoading && (
        <div className="grid h-screen w-screen place-items-center bg-black text-6xl text-white">
          Loading...
        </div>
      )}
      {store.webcamError && (
        <div className="grid h-screen w-screen place-items-center bg-black text-white">
          <p className="text-6xl">{store.webcamError.message}</p>
        </div>
      )}
      <div className="h-full w-full">
        <video
          id="webcam"
          autoPlay
          muted
          className="absolute h-full w-full -scale-x-100 bg-black"
        />
      </div>
      {store.flow && store.webcam && (
        <div className="pointer-events-none absolute inset-0 -scale-x-100">
          {(() => {
            const zones = store.flow!.zones
            const vw = store.webcam!.videoWidth || 640
            const vh = store.webcam!.videoHeight || 480

            // Screen size (your container is full screen)
            const screenW = window.innerWidth
            const screenH = window.innerHeight

            // If your video uses object-contain, pass 'contain'. If object-cover, pass 'cover'.
            const { scaleX, scaleY, offsetX, offsetY } = getVideoFit(
              vw,
              vh,
              screenW,
              screenH,
              'contain',
            )

            const minLen = 2,
              gain = 2.0,
              maxDraw = 12,
              strokeW = 0.9
            const colorFor = (u: number, v: number) => {
              const hue = ((Math.atan2(v, u) * 180) / Math.PI + 360) % 360
              return `hsl(${hue}, 85%, 60%)`
            }

            return (
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox={`0 0 ${screenW} ${screenH}`} // screen space
                preserveAspectRatio="none"
              >
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                  </marker>
                </defs>

                {/* Transform video-space → screen-space */}
                <g
                  transform={`translate(${offsetX},${offsetY}) scale(${scaleX},${scaleY})`}
                >
                  {/* Now x,y,u,v are in the video’s intrinsic space */}
                  {zones.map(({ x, y, u, v }) => {
                    const len = Math.hypot(u, v)
                    if (len < minLen) return null
                    const scale = Math.min(gain, maxDraw / (len || 1))
                    const color = colorFor(u, v)
                    return (
                      <line
                        key={`${x}-${y}`}
                        x1={x}
                        y1={y}
                        x2={x + u * scale}
                        y2={y + v * scale}
                        stroke={color}
                        strokeWidth={strokeW / Math.max(scaleX, scaleY)} // keep visual width similar after scaling
                        markerEnd="url(#arrow)"
                        style={{ color }}
                      />
                    )
                  })}
                </g>
              </svg>
            )
          })()}
        </div>
      )}
    </div>
  )
}
