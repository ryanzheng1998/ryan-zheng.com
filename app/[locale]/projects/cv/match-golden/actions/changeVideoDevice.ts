import { set } from '../useStore'

export const changeVideoDevice = async (deviceId: string) => {
  set({
    webcamLoading: true,
    webcamError: null,
    selectedDeviceId: deviceId,
  })

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: {
          exact: deviceId,
        },
      },
    })

    set({
      stream: stream,
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
