export const setTexture = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  textureName: string,
  texture: WebGLTexture,
  textureSlot: 0 | 1 | 2 | 3
) => {
  switch (textureSlot) {
    case 0:
      gl.activeTexture(gl.TEXTURE0)
      break
    case 1:
      gl.activeTexture(gl.TEXTURE1)
      break
    case 2:
      gl.activeTexture(gl.TEXTURE2)
      break
    case 3:
      gl.activeTexture(gl.TEXTURE3)
      break
  }

  gl.bindTexture(gl.TEXTURE_2D, texture)
  const textureLocation = gl.getUniformLocation(program, textureName)
  gl.uniform1i(textureLocation, textureSlot)
}
