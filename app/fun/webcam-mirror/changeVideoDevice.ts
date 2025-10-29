import { get, set } from './useStore'

export const changeVideoDevice = async (deviceId: string) => {
  const currentStream = get().stream
  currentStream?.getTracks().forEach((track) => track.stop())

  set({
    stream: null,
  })

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      deviceId: {
        exact: deviceId,
      },
    },
  })

  set({
    stream: stream,
  })
}
