import { set } from './useStore'

export const enableCam = async () => {
  try {
    set({
      webcamLoading: true,
      webcamError: null,
    })
    const webcam = document.getElementById('webcam') as HTMLVideoElement
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    })
    webcam.srcObject = stream
    set({
      webcamLoading: false,
    })
  } catch (error) {
    const e = error instanceof Error ? error : new Error('Unknown error')
    set({
      webcamLoading: false,
      webcamError: e,
    })
  }
}
