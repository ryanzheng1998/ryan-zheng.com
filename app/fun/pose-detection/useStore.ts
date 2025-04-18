import {
  HandLandmarker,
  HandLandmarkerResult,
  PoseLandmarker,
  PoseLandmarkerResult,
} from '@mediapipe/tasks-vision'
import KalmanFilter from 'kalmanjs'
import { create } from 'zustand'

const initState = {
  poseLandmarker: null as null | PoseLandmarker,
  animationId: 0,
  webcam: null as null | HTMLVideoElement,
  poseLandmarkerResult: null as null | PoseLandmarkerResult,
  handLandmarker: null as null | HandLandmarker,
  handLandmarkerResult: null as null | HandLandmarkerResult,
  videoWidth: 640,
  videoHeight: 480,
  height: 480,
  width: 640,
  kalmanFilters: new Array(100).map(() => new KalmanFilter()),
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
