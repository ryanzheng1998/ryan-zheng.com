import { set } from './useStore'

export const setupWebcam = async () => {
  const webcam = document.getElementById('webcam') as HTMLVideoElement
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  })
  webcam.srcObject = stream

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect
      set({
        width,
        height,
      })
    }
  })

  observer.observe(webcam)

  webcam.onloadedmetadata = () => {
    set({
      webcam,
      videoWidth: webcam.videoWidth,
      videoHeight: webcam.videoHeight,
    })
  }
}
