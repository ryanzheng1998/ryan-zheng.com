import { create } from 'zustand'

const initState = {
  angle1: 0,
  angle2: 0,
  angle3: 0,
  mousePosition: { x: 0, y: 0 },
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
