'use client'

import { useRef } from 'react'

export default function Home() {
  // use ref to prevent re-render
  const positionRef = useRef({ x: 0, y: 0 })

  return (
    <div className="grid h-screen w-screen place-items-center overflow-hidden">
      <div
        className="cursor-grab touch-none select-none rounded bg-green-500 px-3 py-4 text-sm text-white shadow sm:px-9 sm:py-6 sm:text-3xl sm:text-7xl"
        onPointerDown={(e) => {
          const element = e.currentTarget
          element.setPointerCapture(e.pointerId)
          element.style.cursor = 'grabbing'

          const mouseDownX = e.pageX - positionRef.current.x
          const mouseDownY = e.pageY - positionRef.current.y

          const onPointerMove = (e: PointerEvent) => {
            const dx = e.pageX - mouseDownX
            const dy = e.pageY - mouseDownY

            element.style.transform = `translate(${dx}px, ${dy}px)`

            positionRef.current = { x: dx, y: dy }
          }

          const onPointerUp = () => {
            element.releasePointerCapture(e.pointerId)
            document.removeEventListener('pointermove', onPointerMove)
            document.removeEventListener('pointerup', onPointerUp)
            element.style.cursor = 'grab'
          }

          document.addEventListener('pointermove', onPointerMove)
          document.addEventListener('pointerup', onPointerUp)
        }}
      >
        Draggable
      </div>
    </div>
  )
}
