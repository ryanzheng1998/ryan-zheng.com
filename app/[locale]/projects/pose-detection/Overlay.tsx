import { HandOverlay } from './HandOverlay'
import { PoseOverlay } from './PoseOverlay'
import { useStore } from './useStore'

export const Overlay = () => {
  const state = useStore()
  const xScale = state.width / state.videoWidth
  const yScale = state.height / state.videoHeight
  const scale = Math.min(xScale, yScale)

  const xOffset = (state.width - state.videoWidth * scale) / 2
  const yOffset = (state.height - state.videoHeight * scale) / 2

  return (
    <div className='relative h-full w-full overflow-hidden'>
      <PoseOverlay
        landmarks={state.poseLandmarkerResult?.landmarks ?? []}
        width={state.videoWidth}
        height={state.videoHeight}
        scale={scale}
        xOffset={xOffset}
        yOffset={yOffset}
      />
      <HandOverlay
        landmarks={state.handLandmarkerResult?.landmarks ?? []}
        width={state.videoWidth}
        height={state.videoHeight}
        scale={scale}
        xOffset={xOffset}
        yOffset={yOffset}
      />
    </div>
  )
}
