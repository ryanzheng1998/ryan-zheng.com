import { set } from './useStore'

export const setupWebcam = async (signal?: AbortSignal) => {
  const webcam = document.getElementById('webcam') as HTMLVideoElement | null
  if (!webcam) return
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  if (signal?.aborted) {
    stream.getTracks().forEach((track) => track.stop())
    return
  }
  webcam.srcObject = stream
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries)
      set({ width: entry.contentRect.width, height: entry.contentRect.height })
  })
  observer.observe(webcam)
  webcam.onloadedmetadata = () =>
    set({
      webcam,
      videoWidth: webcam.videoWidth,
      videoHeight: webcam.videoHeight,
    })
  signal?.addEventListener(
    'abort',
    () => {
      observer.disconnect()
      stream.getTracks().forEach((track) => track.stop())
      webcam.srcObject = null
      webcam.onloadedmetadata = null
      set({ webcam: null })
    },
    { once: true },
  )
}
