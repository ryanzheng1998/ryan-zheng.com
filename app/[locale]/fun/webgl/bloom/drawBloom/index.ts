import { combineAndRender } from './combineAndRender'
import { renderSceneToTexture } from './renderSceneToTexture'
import { renderTexture } from './renderTextrue'
import { textureToBlurTexture } from './textureToBlurTexture'
import { textureToBlurTexture2 } from './textureToBlurTexture2'

export const drawBloom = (canvas: HTMLCanvasElement) => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const gl = canvas.getContext('webgl')

  if (!gl) {
    console.error('WebGL not supported')
    return
  }

  const texture = renderSceneToTexture(gl, canvas)
  const texture2 = textureToBlurTexture(gl, canvas, texture)
  const texture3 = textureToBlurTexture2(gl, canvas, texture2)

  renderTexture(gl, canvas, texture)
  combineAndRender(gl, canvas, texture, texture3)
}
