import { createBuffer } from '@/app/fun/webgl/side-effects/createBuffer'
import { createProgram } from '@/app/fun/webgl/side-effects/createProgram'
import { setAttribute } from '@/app/fun/webgl/side-effects/setAttribute'
import { setTexture } from '@/app/fun/webgl/side-effects/setTexture'
import fragmentShaderText from './fragmentShader.glsl'
import vertexShaderText from './vertexShader.glsl'

const quadVertexData = [
  -1.0,
  -1.0,
  0.0,
  0.0,
  0.0, // Bottom left
  1.0,
  -1.0,
  0.0,
  1.0,
  0.0, // Bottom right
  -1.0,
  1.0,
  0.0,
  0.0,
  1.0, // Top left
  1.0,
  1.0,
  0.0,
  1.0,
  1.0, // Top right
]

export const renderTexture = (
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
  texture: WebGLTexture,
) => {
  const quadProgram = createProgram(gl, vertexShaderText, fragmentShaderText)

  createBuffer(gl, quadVertexData)

  setAttribute(gl, quadProgram, 'position', 3, 5, 0)
  setAttribute(gl, quadProgram, 'texCoord', 2, 5, 3)

  gl.useProgram(quadProgram)

  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  setTexture(gl, quadProgram, 'uTexture', texture, 0)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}
