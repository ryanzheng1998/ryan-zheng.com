// @ts-nocheck
// Convert RGBA to luma (grayscale) using Rec.601
export function rgbaToGrayscale(
  rgba: Uint8ClampedArray,
  width: number,
  height: number,
): Uint8Array {
  const gray = new Uint8Array(width * height)
  let gi = 0
  for (let i = 0; i < rgba.length; i += 4) {
    const r = rgba[i],
      g = rgba[i + 1],
      b = rgba[i + 2]
    gray[gi++] = (0.299 * r + 0.587 * g + 0.114 * b) | 0
  }
  return gray
}
