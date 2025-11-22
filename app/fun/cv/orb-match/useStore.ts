import { create } from 'zustand'
import { orb } from './orb'

const initState = {
  images: [] as {
    blob: Blob
    imageWidth: number
    imageHeight: number
    imageUrl: string
    orbResult: Awaited<ReturnType<typeof orb>>
  }[],
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
