// @ts-nocheck
// tiny blur (separable 1-2-1)
export function blur121(
  src: Uint8Array,
  width: number,
  height: number,
): Uint8Array {
  const tmp = new Float32Array(width * height)
  const out = new Uint8Array(width * height)

  // horizontal
  for (let y = 0; y < height; y++) {
    const row = y * width
    tmp[row] = (src[row] + 2 * src[row] + src[row + 1]) / 4
    for (let x = 1; x < width - 1; x++) {
      const i = row + x
      tmp[i] = (src[i - 1] + 2 * src[i] + src[i + 1]) / 4
    }
    tmp[row + width - 1] =
      (src[row + width - 2] + 2 * src[row + width - 1] + src[row + width - 1]) /
      4
  }

  // vertical
  for (let x = 0; x < width; x++) {
    let i = x
    out[i] = ((tmp[i] + 2 * tmp[i] + tmp[i + width]) / 4) | 0
    for (let y = 1; y < height - 1; y++) {
      i = y * width + x
      out[i] = ((tmp[i - width] + 2 * tmp[i] + tmp[i + width]) / 4) | 0
    }
    i = (height - 1) * width + x
    out[i] = ((tmp[i - width] + 2 * tmp[i] + tmp[i]) / 4) | 0
  }
  return out
}
