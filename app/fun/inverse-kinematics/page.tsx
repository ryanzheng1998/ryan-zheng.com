'use client'
import { updateMousePosition } from './updateMousePosition'
import { useStore } from './useStore'

export default function InverseKinematicsPage() {
  const store = useStore()
  return (
    <div>
      <svg
        width="100vw"
        height="100vh"
        viewBox="-50 -50 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="bg-gray-700"
        onMouseMove={updateMousePosition}
      >
        {store.arms.map((arm, index) => {
          return (
            <line
              key={index}
              x1={arm.position.x}
              y1={arm.position.y}
              x2={arm.position.x + Math.cos(arm.angle) * 10}
              y2={arm.position.y + Math.sin(arm.angle) * 10}
              stroke="white"
              strokeWidth="0.5"
            />
          )
        })}
      </svg>
    </div>
  )
}
