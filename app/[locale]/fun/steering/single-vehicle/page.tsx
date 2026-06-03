'use client'
import { useEffect } from 'react'
import { onPointerMove } from './actions/onPointerMove'
import { update } from './actions/update'
import { useStore } from './useStore'

export default function Page() {
  useEffect(() => {
    window.addEventListener('mousemove', onPointerMove)

    setTimeout(() => {
      console.log('state', useStore.getState().history)
    }, 20000)

    return () => {
      window.removeEventListener('mousemove', onPointerMove)
    }
  }, [])

  useEffect(() => {
    const id = requestAnimationFrame(update(performance.now()))

    useStore.setState({ animationId: id })

    return () => {
      const state = useStore.getState()
      cancelAnimationFrame(state.animationId)
    }
  }, [])

  const state = useStore()

  return (
    <div className="relative h-screen w-screen">
      <svg className="absolute h-screen w-screen">
        <polyline
          points={state.vehicle.positionHistory
            .map((p) => `${p.x},${p.y}`)
            .join(' ')}
          fill="none"
          stroke="red"
          strokeWidth="2"
        />
        <g
          transform={`translate(${state.vehicle.position.x}, ${
            state.vehicle.position.y
          }) rotate(${state.vehicle.angle + 90}, 0, 0)`}
        >
          <polygon points="0,-10 8,10 -8,10" fill="blue" stroke="black" />
        </g>
      </svg>
    </div>
  )
}
