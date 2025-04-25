import { createProgram } from '@/app/fun/webgl/side-effects/createProgram'
import fragmentShaderText from './fragmentShader.glsl'
import { generateGaussianKernel } from './generateGaussianKernel'
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

export const textureToBlurTexture2 = (
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
  texture: WebGLTexture,
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

  //
  // Create a texture to render to
  //
  const newTexture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, newTexture)
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    canvas.width,
    canvas.height,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null,
  )
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

  //
  // Create and bind the framebuffer
  //
  const framebuffer = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    newTexture,
    0,
  )

  // Check framebuffer status
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
  if (status !== gl.FRAMEBUFFER_COMPLETE) {
    throw new Error('Framebuffer is not complete' + status)
  }

  //
  // set the program as part of the current rendering state
  //
  gl.useProgram(quadProgram)

  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.uniform1i(gl.getUniformLocation(quadProgram, 'uTexture'), 0)
  gl.uniform1f(
    gl.getUniformLocation(quadProgram, 'u_blurAmount_x'),
    1.0 / canvas.width,
  )
  gl.uniform1f(
    gl.getUniformLocation(quadProgram, 'u_blurAmount_y'),
    1.0 / canvas.height,
  )

  const kernelSize = 11
  const sigma = 3

  gl.uniform1fv(
    gl.getUniformLocation(quadProgram, 'uWeights'),
    new Float32Array(generateGaussianKernel(kernelSize, sigma)),
  )
  gl.uniform1f(gl.getUniformLocation(quadProgram, 'uKernelSize'), kernelSize)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  //
  // clean up
  //
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  if (newTexture === null) {
    throw new Error('newTexture is null')
  }

  return newTexture
}
