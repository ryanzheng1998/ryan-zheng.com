'use client'

import { useEffect } from 'react'
import { drawBloom } from './drawBloom'

export default function Page() {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement

    drawBloom(canvas)
  }, [])

  return <canvas id="canvas" />
}
