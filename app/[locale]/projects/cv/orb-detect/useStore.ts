import { create } from 'zustand'
import { orb } from './orb'

const initState = {
  image: null as Blob | null,
  orbResult: null as null | Awaited<ReturnType<typeof orb>>,
  imageUrl:
    `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect width='100%25' height='100%25' fill='%23eee'/%3E%3Ctext x='50%25' y='50%25' font-size='20' text-anchor='middle' fill='%23aaa' dy='.35em'%3ENO IMAGE%3C/text%3E%3C/svg%3E` as string,
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
