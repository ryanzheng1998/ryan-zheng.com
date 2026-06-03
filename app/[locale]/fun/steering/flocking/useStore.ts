import { mulberry32 } from '@/functions/mulberry32'
import { Vector } from '@/structure/Vector'
import { create } from 'zustand'

const getInitialState = () => {
  const rand = mulberry32(30)

  const vehicles = new Array(100).fill(0).map(() => {
    return {
      id: rand(),
      position: new Vector(rand() * 1920, rand() * 1080),
      velocity: new Vector(rand() * 10, rand() * 100),
      angle: 0,
      maxSpeed: 50,
      positionHistory: [] as Vector[],
    }
  })

  return {
    rand,
    animationId: 0,
    mousePosition: new Vector(0, 0),
    vehicles,
    config: {
      damping: 0.5,
    },
  }
}

export type Vehicle = ReturnType<typeof getInitialState>['vehicles'][0]

export const useStore =
  create<ReturnType<typeof getInitialState>>()(getInitialState)
