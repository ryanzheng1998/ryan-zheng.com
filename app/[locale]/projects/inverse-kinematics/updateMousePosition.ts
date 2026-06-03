import { MouseEvent } from 'react'
import { set } from './useStore'

const toDeg = (rad: number) => rad * (180 / Math.PI)
const toRad = (deg: number) => deg * (Math.PI / 180)

export function solveIK(targetX: number, targetY: number) {
  const l1 = 10
  const l2 = 10
  const l3 = 10

  const dx = targetX
  const dy = targetY
  const d = Math.hypot(dx, dy)

  // Clamp to max reach
  const maxReach = l1 + l2 + l3
  const clampedD = Math.min(d, maxReach - 0.001)

  // Adjust for wrist (end of link2)
  const ratio = (clampedD - l3) / d
  const wristX = dx * ratio
  const wristY = dy * ratio
  const wristDist = Math.hypot(wristX, wristY)

  // Solve angle2 using Law of Cosines
  const cosA2 = (l1 ** 2 + l2 ** 2 - wristDist ** 2) / (2 * l1 * l2)
  const angle2 = Math.acos(Math.max(-1, Math.min(1, cosA2)))

  // Solve angle1
  const k1 = l1 + l2 * Math.cos(angle2)
  const k2 = l2 * Math.sin(angle2)
  const angle1 = Math.atan2(wristY, wristX) - Math.atan2(k2, k1)

  // Solve angle3 to match orientation
  const totalAngle = Math.atan2(dy - wristY, dx - wristX)
  const angle3 = totalAngle - angle1 - angle2

  return {
    angle1: toDeg(angle1),
    angle2: toDeg(angle2),
    angle3: toDeg(angle3),
  }
}

export const updateMousePosition = (event: MouseEvent) => {
  const { clientX, clientY } = event
  const { innerWidth, innerHeight } = window

  const x = (clientX / innerWidth) * 100 - 50
  const y = (clientY / innerHeight) * 100 - 50

  const { angle1, angle2, angle3 } = solveIK(x, y)

  set({
    angle1,
    angle2,
    angle3,
    mousePosition: { x, y },
  })
}
