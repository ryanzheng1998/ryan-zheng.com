import { createProgram } from '@/app/[lang]/fun/webgl/side-effects/createProgram'
import fragmentShaderText from './fragmentShader.glsl'
import vertexShaderText from './vertexShader.glsl'

const vertexData = [
  // x, y, z, r, g, b
  0.0, 0.5, 0.0, 1.0, 0.0, 0.0,
  //
  -0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
  //
  0.3, 0.5, 0.0, 1.0, 0.0, 0.0,
  //
  -0.8, -0.5, 0.0, 1.0, 0.0, 0.0,
  //
  -0.8, 0.5, 0.0, 1.0, 0.0, 0.0,
  //
  0.5, -0.5, 0.0, 1.0, 0.0, 0.0,
  //
  0.0, 0.0, 0.0, 0.0, 1.0, 0.0,
  //
  0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
  //
  1.0, 0.0, 0.0, 0.0, 1.0, 0.0,
  //
  0.0, 0.0, 0.0, 0.0, 1.0, 0.0,
]

export const renderSceneToTexture = (
  gl: WebGLRenderingContext,
  canvas: HTMLCanvasElement,
) => {
  const program = createProgram(gl, vertexShaderText, fragmentShaderText)

  //
  // create vertexBuffer and load vertexData into it
  //
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW)

  //
  // enable vertex attributes
  //
  const positionAttribLocation = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(positionAttribLocation)
  gl.vertexAttribPointer(
    positionAttribLocation,
    3,
    gl.FLOAT,
    false,
    6 * Float32Array.BYTES_PER_ELEMENT,
    0,
  )

  const colorAttribLocation = gl.getAttribLocation(program, 'color')
  gl.enableVertexAttribArray(colorAttribLocation)
  gl.vertexAttribPointer(
    colorAttribLocation,
    3,
    gl.FLOAT,
    false,
    6 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT,
  )

  //
  // Create a texture to render to
  //
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
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
    texture,
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
  gl.useProgram(program)
  gl.enable(gl.DEPTH_TEST)

  //
  // draw
  //
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.drawArrays(gl.LINES, 0, vertexData.length / 6)

  //
  // clean up
  //
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  // gl.deleteProgram(program);
  // gl.deleteBuffer(vertexBuffer);
  // gl.deleteFramebuffer(framebuffer);

  if (texture === null) {
    throw new Error('Failed to create texture')
  }

  return texture
}
