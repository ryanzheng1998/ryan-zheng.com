import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

const initState = {
  rotationX: -40,
  rotationY: -40,
  zoom: 1,
}

export const useStore = create<typeof initState>()(
  subscribeWithSelector(() => ({ ...initState }))
)
