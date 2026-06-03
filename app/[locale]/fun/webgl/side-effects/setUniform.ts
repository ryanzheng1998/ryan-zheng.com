export const setUniform = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  uniformName: string,
  value: number[] | Float32Array
) => {
  gl.useProgram(program)
  const uniformLocation = gl.getUniformLocation(program, uniformName)

  switch (value.length) {
    case 1:
      gl.uniform1fv(uniformLocation, value)
      break
    case 2:
      gl.uniform2fv(uniformLocation, value)
      break
    case 3:
      gl.uniform3fv(uniformLocation, value)
      break
    case 4:
      // ignore uniformMatrix2fv
      gl.uniform4fv(uniformLocation, value)
      break
    case 9:
      gl.uniformMatrix3fv(uniformLocation, false, value)
      break
    case 16:
      gl.uniformMatrix4fv(uniformLocation, false, value)
      break
  }
}
