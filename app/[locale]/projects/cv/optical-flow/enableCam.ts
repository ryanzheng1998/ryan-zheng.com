import { set } from './useStore'

export const enableCam = async (signal?: AbortSignal) => {
  try {
    set({
      webcamLoading: true,
      webcamError: null,
    })
    const webcam = document.getElementById('webcam') as HTMLVideoElement
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    })
    if (signal?.aborted) {
      stream.getTracks().forEach((track) => track.stop())
      return
    }
    signal?.addEventListener(
      'abort',
      () => {
        stream.getTracks().forEach((track) => track.stop())
        webcam.srcObject = null
        set({ webcam: null })
      },
      { once: true },
    )
    webcam.srcObject = stream
    set({
      webcamLoading: false,
      webcam: webcam,
    })
  } catch (error) {
    const e = error instanceof Error ? error : new Error('Unknown error')
    if (signal?.aborted) return
    set({
      webcamLoading: false,
      webcamError: e,
    })
  }
}
