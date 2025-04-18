import {
  FilesetResolver,
  HandLandmarker,
  PoseLandmarker,
} from '@mediapipe/tasks-vision'
import { set } from './useStore'

export const onMount = async () => {
  // setup webcam
  const webcam = document.getElementById('webcam') as HTMLVideoElement
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  })
  webcam.srcObject = stream
  webcam.onloadedmetadata = () => {
    set({
      webcam,
      videoWidth: webcam.videoWidth,
      videoHeight: webcam.videoHeight,
    })
  }

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

  // setup pose detection
  const vision = await FilesetResolver.forVisionTasks('/pose-detection/wasm')
  const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `/pose-detection/pose_landmarker_heavy.task`,
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
    numPoses: 2,
  })

  // setup hand detection
  const handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: '/pose-detection/hand_landmarker.task',
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
    numHands: 6,
  })

  set({ poseLandmarker, handLandmarker })
}
