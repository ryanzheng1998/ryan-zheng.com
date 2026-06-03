import { createProgram } from '@/app/[locale]/fun/webgl/side-effects/createProgram'
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

export const combineAndRender = (
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
  texture1: WebGLTexture,
  texture2: WebGLTexture,
) => {
  const quadProgram = createProgram(gl, vertexShaderText, fragmentShaderText)

  const quadVertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quadVertexBuffer)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(quadVertexData),
    gl.STATIC_DRAW,
  )

  const positionAttribLocation = gl.getAttribLocation(quadProgram, 'position')
  const texCoordAttribLocation = gl.getAttribLocation(quadProgram, 'texCoord')

  gl.enableVertexAttribArray(positionAttribLocation)
  gl.vertexAttribPointer(
    positionAttribLocation,
    3,
    gl.FLOAT,
    false,
    5 * Float32Array.BYTES_PER_ELEMENT,
    0,
  )

  gl.enableVertexAttribArray(texCoordAttribLocation)
  gl.vertexAttribPointer(
    texCoordAttribLocation,
    2,
    gl.FLOAT,
    false,
    5 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT,
  )

  gl.useProgram(quadProgram)

  gl.disable(gl.DEPTH_TEST)

  // // Enable blending
  // gl.enable(gl.BLEND);

  // // Use additive blending
  // gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  // Bind the first texture to texture unit 0
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture1)

  // Bind the second texture to texture unit 1
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, texture2)

  // Set the sampler uniforms
  const texture1Location = gl.getUniformLocation(quadProgram, 'u_texture1')
  gl.uniform1i(texture1Location, 0) // Texture unit 0

  const texture2Location = gl.getUniformLocation(quadProgram, 'u_texture2')
  gl.uniform1i(texture2Location, 1) // Texture unit 1

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}
