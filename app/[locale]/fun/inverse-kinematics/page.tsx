'use client'
import { updateMousePosition } from './updateMousePosition'
import { useStore } from './useStore'

export default function InverseKinematicsPage() {
  const store = useStore()

  const radAngle1 = (store.angle1 * Math.PI) / 180
  const radAngle2 = (store.angle2 * Math.PI) / 180
  const radAngle3 = (store.angle3 * Math.PI) / 180
  const armLength1 = 10
  const armLength2 = 10
  const armLength3 = 10
  const arm1X1 = Math.cos(radAngle1) * armLength1
  const arm1Y1 = Math.sin(radAngle1) * armLength1
  const arm2X2 = arm1X1 + Math.cos(radAngle2) * armLength2
  const arm2Y2 = arm1Y1 + Math.sin(radAngle2) * armLength2
  const arm3X3 = arm2X2 + Math.cos(radAngle3) * armLength3
  const arm3Y3 = arm2Y2 + Math.sin(radAngle3) * armLength3

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
        <line
          x1="0"
          y1="0"
          x2={arm1X1}
          y2={arm1Y1}
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1={arm1X1}
          y1={arm1Y1}
          x2={arm2X2}
          y2={arm2Y2}
          stroke="white"
          strokeWidth="2"
        />
        <line
          x1={arm2X2}
          y1={arm2Y2}
          x2={arm3X3}
          y2={arm3Y3}
          stroke="white"
          strokeWidth="2"
        />
        <circle cx={arm3X3} cy={arm3Y3} r="2" fill="red" />
        <circle cx={arm1X1} cy={arm1Y1} r="2" fill="blue" />
        <circle cx={arm2X2} cy={arm2Y2} r="2" fill="green" />
      </svg>
    </div>
  )
}
