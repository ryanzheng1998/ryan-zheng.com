import { getRGBAFromVideo } from './getRGBAFromVideo'
import { smoothFlowFromHistory } from './smoothFlowFromHistory'
import { get, set } from './useStore'

export const onTimeUpdate = (t1: number) => (t2: number) => {
  const id = requestAnimationFrame(onTimeUpdate(t2))

  set({
    animationId: id,
  })

  const s = get()

  if (s.webcam === null) return

  const image = getRGBAFromVideo(s.webcam)
  const previousImage = s.previousImage
  const newHistory = [image, ...s.imageHistory].slice(0, 10)

  set({
    previousImage: image,
    imageHistory: newHistory,
  })

  if (previousImage === null) return

  const flow = smoothFlowFromHistory(
    newHistory,
    s.webcam.videoWidth,
    s.webcam.videoHeight,
  )

  set({
    flow,
  })
}
