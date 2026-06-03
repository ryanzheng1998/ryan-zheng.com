import {
  FilesetResolver,
  HandLandmarker,
  PoseLandmarker,
} from '@mediapipe/tasks-vision'
import { set } from './useStore'

export const loadModels = async () => {
  set({ loading: true })

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

  set({ poseLandmarker, handLandmarker, loading: false })
}
