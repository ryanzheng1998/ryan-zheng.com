import { create } from 'zustand'

interface Vector {
  x: number
  y: number
}

interface ArmState {
  position: Vector
  velocity: Vector
  angle: number
}

const initState = {
  arms: [
    {
      position: { x: 0, y: 0 },
      velocity: { x: 0, y: 0 },
      angle: 0,
    },
    // {
    //   position: { x: 10, y: 0 },
    //   velocity: { x: 0, y: 0 },
    //   angle: 0,
    // },
    // {
    //   position: { x: 20, y: 0 },
    //   velocity: { x: 0, y: 0 },
    //   angle: 0,
    // },
  ] as ArmState[],
  mousePosition: { x: 0, y: 0 } as Vector,
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
