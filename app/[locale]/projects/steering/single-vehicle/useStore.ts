import { create } from 'zustand'

const initState = {
  animationId: 0,
  mousePosition: { x: 0, y: 0 },
  vehicle: {
    position: { x: 50, y: 50 },
    velocity: { x: 0, y: 0 },
    angle: 0,
    maxSpeed: 300,
    maxForce: 5000,
    positionHistory: [] as { x: number; y: number }[],
  },
  history: [] as { position: { x: number; y: number }; angle: number }[],
  config: {
    damping: 1,
  },
}

export const useStore = create<typeof initState>()((set) => initState)
