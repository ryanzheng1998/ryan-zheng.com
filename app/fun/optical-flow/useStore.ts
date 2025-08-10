import { create } from 'zustand'
import { computeOpticalFlow } from './computeOpticalFlow'

const initState = {
  webcamLoading: false,
  webcamError: null as null | Error,
  webcam: null as null | HTMLVideoElement,
  previousImage: null as null | Uint8ClampedArray,
  flow: null as null | ReturnType<typeof computeOpticalFlow>,
  animationId: 0,
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
