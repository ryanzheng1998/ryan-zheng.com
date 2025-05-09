'use client'

import { clamp } from '@/functions/clamp'
import { useEffect } from 'react'
import { drawSphere } from './drawSphere'
import { useStore } from './useStore'

export default function Page() {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement

    const cancel = drawSphere(canvas)

    return () => {
      if (typeof cancel === 'function') {
        cancel()
      }
    }
  }, [])

  return (
    <canvas
      className="fixed inset-0"
      id="canvas"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)

        const onPointerMove = (e: MouseEvent) => {
          const state = useStore.getState()

          const rotationX = state.rotationX - e.movementY

          useStore.setState({
            rotationX: clamp(rotationX, -180, 180),
            rotationY: state.rotationY + e.movementX,
          })
        }

        const onPointerUp = () => {
          window.removeEventListener('pointermove', onPointerMove)
          window.removeEventListener('pointerup', onPointerUp)
        }

        window.addEventListener('pointermove', onPointerMove)
        window.addEventListener('pointerup', onPointerUp)
      }}
      onWheel={(e) => {
        const state = useStore.getState()

        useStore.setState({
          zoom: clamp(state.zoom - e.deltaY / 3000, 0.1, 10),
        })
      }}
    />
  )
}
