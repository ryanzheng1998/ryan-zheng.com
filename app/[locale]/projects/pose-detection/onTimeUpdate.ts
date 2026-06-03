import { get, set } from './useStore'

export const onTimeUpdate = (t1: number) => (t2: number) => {
  const id = requestAnimationFrame(onTimeUpdate(t2))

  set({
    animationId: id,
  })

  const s = get()

  if (
    s.poseLandmarker === null ||
    s.webcam === null ||
    s.handLandmarker === null
  )
    return

  s.poseLandmarker.detectForVideo(s.webcam, t2, (result) => {
    set({
      poseLandmarkerResult: result,
    })
  })

  const detection = s.handLandmarker.detectForVideo(s.webcam, t2)
  set({
    handLandmarkerResult: detection,
  })
}
