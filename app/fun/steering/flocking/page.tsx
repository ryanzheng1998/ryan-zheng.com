'use client'
import { useEffect } from 'react'
import { onPointerMove } from './actions/onPointerMove'
import { update } from './actions/update'
import { useStore } from './useStore'

export default function Page() {
  useEffect(() => {
    window.addEventListener('mousemove', onPointerMove)

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
    <div>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        <rect
          x="0"
          y="0"
          width="1920"
          height="1080"
          fill="hsla(0, 0%, 50%, 0.1)"
        />
        {state.vehicles.map((vehicle) => {
          return (
            <g key={vehicle.id}>
              <polyline
                points={vehicle.positionHistory
                  .map((p) => `${p.x},${p.y}`)
                  .join(' ')}
                fill="none"
                stroke="red"
                strokeWidth="2"
              />
              <g
                transform={`translate(${vehicle.position.x}, ${
                  vehicle.position.y
                }) rotate(${vehicle.angle + 90}, 0, 5)`}
              >
                <polygon points="0,-10 8,10 -8,10" fill="blue" stroke="black" />
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
