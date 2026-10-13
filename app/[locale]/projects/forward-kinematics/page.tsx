'use client'
import { set, useStore } from './useStore'

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
      <div className="fixed left-0 top-0 m-5 grid gap-4 rounded-lg bg-[#f7f4ec] p-5 text-[#183e35]">
        <label className="grid gap-2 text-xs">
          Joint 1: {store.angle1}°
          <input
            aria-label="Joint 1 angle"
            type="range"
            min="-180"
            max="180"
            step="1"
            value={store.angle1}
            onChange={(e) => set({ angle1: Number(e.target.value) })}
          />
        </label>
        <label className="grid gap-2 text-xs">
          Joint 2: {store.angle2}°
          <input
            aria-label="Joint 2 angle"
            type="range"
            min="-180"
            max="180"
            step="1"
            value={store.angle2}
            onChange={(e) => set({ angle2: Number(e.target.value) })}
          />
        </label>
        <label className="grid gap-2 text-xs">
          Joint 3: {store.angle3}°
          <input
            aria-label="Joint 3 angle"
            type="range"
            min="-180"
            max="180"
            step="1"
            value={store.angle3}
            onChange={(e) => set({ angle3: Number(e.target.value) })}
          />
        </label>
      </div>
    </div>
  )
}
