import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

const initState = {
  rotationX: 0,
  rotationY: 0,
  zoom: 1,
}

export const useStore = create<typeof initState>()(
  subscribeWithSelector(() => ({ ...initState }))
)
