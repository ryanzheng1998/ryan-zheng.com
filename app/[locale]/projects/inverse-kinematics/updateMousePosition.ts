import { PointerEvent } from 'react'
import { set } from './useStore'

const toDeg = (rad: number) => rad * (180 / Math.PI)
// The renderer stores absolute segment angles, so return world-space angles.
export function solveIK(targetX: number, targetY: number) {
  const l1 = 10,
    l2 = 10,
    l3 = 10
  const distance = Math.hypot(targetX, targetY)
  const direction = distance === 0 ? 0 : Math.atan2(targetY, targetX)
  const reach = Math.min(distance, l1 + l2 + l3)
  const wristX = (reach - l3) * Math.cos(direction)
  const wristY = (reach - l3) * Math.sin(direction)
  const cosine = (wristX ** 2 + wristY ** 2 - l1 ** 2 - l2 ** 2) / (2 * l1 * l2)
  const elbow = Math.acos(Math.max(-1, Math.min(1, cosine)))
  const shoulder =
    Math.atan2(wristY, wristX) -
    Math.atan2(l2 * Math.sin(elbow), l1 + l2 * Math.cos(elbow))
  return {
    angle1: toDeg(shoulder),
    angle2: toDeg(shoulder + elbow),
    angle3: toDeg(direction),
  }
}

export const updateMousePosition = (event: PointerEvent<SVGSVGElement>) => {
  const { clientX, clientY } = event
  const {
    left,
    top,
    width: innerWidth,
    height: innerHeight,
  } = event.currentTarget.getBoundingClientRect()

  const x = ((clientX - left) / innerWidth) * 100 - 50
  const y = ((clientY - top) / innerHeight) * 100 - 50

  const { angle1, angle2, angle3 } = solveIK(x, y)

  set({
    angle1,
    angle2,
    angle3,
    mousePosition: { x, y },
  })
}
