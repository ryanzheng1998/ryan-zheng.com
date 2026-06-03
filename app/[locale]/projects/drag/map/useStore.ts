import { create } from 'zustand'

const initState = {
  zoom: 1,
  panX: 0,
  panY: 0,
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
