export const setAttribute = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  attributeName: string,
  size: number,
  stride: number,
  offset: number
) => {
  const attribLocation = gl.getAttribLocation(program, attributeName)
  gl.enableVertexAttribArray(attribLocation)
  gl.vertexAttribPointer(
    attribLocation,
    size,
    gl.FLOAT,
    false,
    stride * Float32Array.BYTES_PER_ELEMENT,
    offset * Float32Array.BYTES_PER_ELEMENT
  )
}
