type FitMode = 'contain' | 'cover'

interface FitResult {
  scaleX: number
  scaleY: number
  offsetX: number
  offsetY: number
  drawWidth: number
  drawHeight: number
}

/**
 * Calculates how a video should be scaled & positioned in a screen.
 *
 * @param videoW intrinsic video width (video.videoWidth)
 * @param videoH intrinsic video height (video.videoHeight)
 * @param screenW container width (e.g., window.innerWidth)
 * @param screenH container height (e.g., window.innerHeight)
 * @param fit object-fit mode ('contain' or 'cover')
 */
export function getVideoFit(
  videoW: number,
  videoH: number,
  screenW: number,
  screenH: number,
  fit: FitMode = 'contain',
): FitResult {
  if (!videoW || !videoH || !screenW || !screenH) {
    return {
      scaleX: 1,
      scaleY: 1,
      offsetX: 0,
      offsetY: 0,
      drawWidth: screenW,
      drawHeight: screenH,
    }
  }

  const scale =
    fit === 'contain'
      ? Math.min(screenW / videoW, screenH / videoH)
      : Math.max(screenW / videoW, screenH / videoH)

  const drawWidth = videoW * scale
  const drawHeight = videoH * scale

  const offsetX = (screenW - drawWidth) / 2
  const offsetY = (screenH - drawHeight) / 2

  return {
    scaleX: scale,
    scaleY: scale,
    offsetX,
    offsetY,
    drawWidth,
    drawHeight,
  }
}
