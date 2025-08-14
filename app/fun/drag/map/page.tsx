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
      className="h-screen w-screen overflow-hidden overscroll-contain bg-black"
    >
      <div className="origin-top-left">
        <img
          draggable="false"
          src="/flip-card/DALL·E 2024-02-21 14.41.27 - Create an image of a vibrant city street scene at night. The focus should be on a large, illuminated billboard attached to a building. The billboard d.webp"
        />
      </div>
    </div>
  )
}
