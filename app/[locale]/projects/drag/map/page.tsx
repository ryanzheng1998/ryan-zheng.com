'use client'
import { useEffect, useRef } from 'react'
import { drag } from './drag'
import { zoom } from './zoom'

export default function Page() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current === null) return

    ref.current.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault()
      },
      {
        passive: false,
      },
    )
  }, [])

  return (
    <div
      ref={ref}
      onWheel={zoom}
      onPointerDown={drag}
      className="h-screen w-screen touch-none select-none overflow-hidden bg-black"
    >
      <img
        alt="Night-time city scene for pan and zoom"
        draggable="false"
        src="/images/night-billboard.webp"
      />
    </div>
  )
}
