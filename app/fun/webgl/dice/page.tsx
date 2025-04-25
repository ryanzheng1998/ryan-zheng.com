'use client'

import { clamp } from '@/functions/clamp'
import { useEffect } from 'react'
import { drawTexture } from './drawTexture'
import { useStore } from './useStore'

export default function Page() {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement

    const cancel = drawTexture(canvas)

    return () => {
      if (cancel instanceof Function) cancel()
    }
  }, [])

  return (
    <canvas
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
    />
  )
}
