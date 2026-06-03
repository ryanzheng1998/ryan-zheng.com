export function getRGBAFromVideo(video: HTMLVideoElement): Uint8ClampedArray {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  if (canvas.width === 0 || canvas.height === 0) {
    return new Uint8ClampedArray()
  }

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not get 2D context')

  // Draw the current video frame into the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

  // Extract pixel data (RGBA)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  return imageData.data // Uint8ClampedArray (R, G, B, A sequence)
}
