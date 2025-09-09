import { create } from 'zustand'

const width = 3840
const height = 2160
const grid = 80 * 3

const initState = {
  rotation: Array.from({ length: width / grid }, () =>
    Array.from({ length: height / grid }, () => 180 - Math.random() * 60),
  ),
  grid,
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
