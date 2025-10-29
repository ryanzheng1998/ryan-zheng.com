import { create } from 'zustand'

const initState = {
  webcamLoading: false,
  webcamError: null as null | Error,
  golden: null as null | string,
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
