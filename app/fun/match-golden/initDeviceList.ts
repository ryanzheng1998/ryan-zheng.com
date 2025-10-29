import { set } from './useStore'

export const initDeviceList = async () => {
  set({
    webcamLoading: true,
    webcamError: null,
  })

  //
  // Request camera permission first
  //
  try {
    await navigator.mediaDevices.getUserMedia({
      video: true,
    })
  } catch (error) {
    const e = error instanceof Error ? error : new Error('Unknown error')
    set({
      webcamLoading: false,
      webcamError: e,
    })
    return
  }

  //
  // This should be called after permission is granted
  //
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = devices.filter((device) => device.kind === 'videoinput')

  if (videoDevices.length === 0) return

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: {
        exact: videoDevices[0]!.deviceId,
      },
    },
  })

  set({
    videoDevices: videoDevices,
    stream: stream,
    webcamLoading: false,
  })
}
