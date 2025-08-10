import { computeOpticalFlow } from './computeOpticalFlow'
import { getRGBAFromVideo } from './getRGBAFromVideo'
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

  set({
    previousImage: image,
  })

  if (previousImage === null) return

  const flow = computeOpticalFlow(
    previousImage,
    image,
    s.webcam.videoWidth,
    s.webcam.videoHeight,
  )

  set({
    flow,
  })
}
