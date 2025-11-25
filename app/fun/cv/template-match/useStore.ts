import { create } from 'zustand'

const initState = {
  images: [] as {
    blob: Blob
    imageWidth: number
    imageHeight: number
    imageUrl: string
    transform: string | undefined
  }[],
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
