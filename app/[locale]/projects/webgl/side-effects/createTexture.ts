export const createTexture = (
  gl: WebGLRenderingContext,
  imagePath: string
): Promise<WebGLTexture | Error> =>
  new Promise((resolve, reject) => {
    const texture = gl.createTexture()

    if (!texture) {
      resolve(new Error('Failed to create texture'))
      return
    }

    const image = new Image()

    image.src = imagePath

    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

      gl.bindTexture(gl.TEXTURE_2D, null)

      resolve(texture)
    }
  })
