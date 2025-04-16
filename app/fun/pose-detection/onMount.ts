export const onMount = async () => {
  // setup webcam
  const webcam = document.getElementById('webcam') as HTMLVideoElement
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  })
  webcam.srcObject = stream

  // setup pose detection
  const vision = await FilesetResolver.forVisionTasks('/wasm')
  const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `/pose_landmarker_lite.task`,
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
    numPoses: 2,
  })
}
