/**
 * Compute sparse optical flow (Lucas–Kanade) on a grid.
 * - oldRGBA/newRGBA: Uint8ClampedArray (ImageData.data) length = width*height*4
 * - width/height: image size in pixels
 * - step: zone half-size in pixels (default 8). Centers are spaced by 2*step+1.
 *
 * Returns:
 * {
 *   zones: [{ x, y, u, v }, ...], // zone centers and motion vectors (pixels/frame)
 *   u: number, v: number           // global average over zones
 * }
 *
 * Note: like the original, this samples the RED channel only for speed.
 */
export function computeOpticalFlow(
  oldRGBA: Uint8ClampedArray,
  newRGBA: Uint8ClampedArray,
  width: number,
  height: number,
  step = 8,
) {
  const zones = []
  const winStep = step * 2 + 1

  let uu = 0,
    vv = 0
  const wMax = width - step - 1
  const hMax = height - step - 1

  for (let cy = step + 1; cy < hMax; cy += winStep) {
    for (let cx = step + 1; cx < wMax; cx += winStep) {
      let A2 = 0,
        A1B2 = 0,
        B1 = 0,
        C1 = 0,
        C2 = 0

      // accumulate normal equations over the (2*step+1)^2 window
      for (let dy = -step; dy <= step; dy++) {
        for (let dx = -step; dx <= step; dx++) {
          const x = cx + dx
          const y = cy + dy
          const addr = y * width + x

          // Use red channel only (index *4)
          const gx = newRGBA[(addr - 1) * 4] - newRGBA[(addr + 1) * 4]
          const gy = newRGBA[(addr - width) * 4] - newRGBA[(addr + width) * 4]
          const gt = oldRGBA[addr * 4] - newRGBA[addr * 4]

          A2 += gx * gx
          A1B2 += gx * gy
          B1 += gy * gy
          C2 += gx * gt
          C1 += gy * gt
        }
      }

      const delta = A1B2 * A1B2 - A2 * B1
      let u, v

      if (delta !== 0) {
        // Non-singular: solve 2x2 via Cramer's rule
        const inv = step / delta
        const dx = -(C1 * A1B2 - C2 * B1)
        const dy = -(A1B2 * C2 - A2 * C1)
        u = dx * inv
        v = dy * inv
      } else {
        // Singular: flow along gradient direction
        const norm = (A1B2 + A2) * (A1B2 + A2) + (B1 + A1B2) * (B1 + A1B2)
        if (norm !== 0) {
          const scale = -(C1 + C2) * (step / norm)
          u = (A1B2 + A2) * scale
          v = (B1 + A1B2) * scale
        } else {
          u = v = 0
        }
      }

      // Discard crazy vectors (same gate as original)
      if (-winStep < u && u < winStep && -winStep < v && v < winStep) {
        uu += u
        vv += v
        zones.push({ x: cx, y: cy, u, v })
      }
    }
  }

  const avgU = zones.length ? uu / zones.length : 0
  const avgV = zones.length ? vv / zones.length : 0
  return { zones, u: avgU, v: avgV }
}
