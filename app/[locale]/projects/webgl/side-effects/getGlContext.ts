export const getGlContext = (canvas: HTMLCanvasElement, superScale = 2) => {
  // super scaling the canvas to make it look better on retina displays
  const pixelRatio = Math.max(
    window.screen.width / window.innerWidth,
    window.screen.height / window.innerHeight
  )

  canvas.width = window.innerWidth * pixelRatio * superScale
  canvas.height = window.innerHeight * pixelRatio * superScale
  canvas.style.width = window.innerWidth + 'px'
  canvas.style.height = window.innerHeight + 'px'

  const gl = canvas.getContext('webgl2')

  if (!gl) {
    return new Error('WebGL not supported')
  }

  return gl
}
