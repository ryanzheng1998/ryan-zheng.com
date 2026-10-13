import { set } from '../useStore'

export const initDeviceList = async (signal?: AbortSignal) => {
  set({ webcamLoading: true, webcamError: null })
  let stream: MediaStream | undefined
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true })
    if (signal?.aborted) {
      stream.getTracks().forEach((track) => track.stop())
      return
    }
    const devices = await navigator.mediaDevices.enumerateDevices()
    if (signal?.aborted) {
      stream.getTracks().forEach((track) => track.stop())
      return
    }
    const videoDevices = devices.filter(
      (device) => device.kind === 'videoinput',
    )
    if (!videoDevices.length)
      throw new Error('No camera found. Connect a camera and try again.')
    set({
      videoDevices,
      stream,
      webcamLoading: false,
      selectedDeviceId:
        stream.getVideoTracks()[0]?.getSettings().deviceId ??
        videoDevices[0]!.deviceId,
    })
  } catch (error) {
    stream?.getTracks().forEach((track) => track.stop())
    if (!signal?.aborted)
      set({
        webcamLoading: false,
        webcamError:
          error instanceof Error ? error : new Error('Unable to start camera.'),
      })
  }
}
