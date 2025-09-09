import { rgbaToGrayscale } from '@/functions/rgbaToGrayscale'

type Zone = { x: number; y: number; u: number; v: number }

export function computeOpticalFlow(
  oldRGBA: Uint8ClampedArray,
  newRGBA: Uint8ClampedArray,
  width: number,
  height: number,
  step = 8,
  lambdaMinThresh = 300,
) {
  const oldG = rgbaToGrayscale(oldRGBA, width, height)
  const newG = rgbaToGrayscale(newRGBA, width, height)

  // Helper to satisfy noUncheckedIndexedAccess
  const at = (arr: Uint8ClampedArray, idx: number): number => arr[idx] ?? 0

  const zones: Zone[] = []
  const winStep = step * 2 + 1

  let uu = 0
  let vv = 0
  const wMax = width - step - 1
  const hMax = height - step - 1

  for (let cy = step + 1; cy < hMax; cy += winStep) {
    for (let cx = step + 1; cx < wMax; cx += winStep) {
      let A2 = 0
      let A1B2 = 0
      let B1 = 0
      let C1 = 0
      let C2 = 0

      // accumulate normal equations over the (2*step+1)^2 window
      for (let dy = -step; dy <= step; dy++) {
        const y = cy + dy
        const yOff = y * width

        for (let dx = -step; dx <= step; dx++) {
          const x = cx + dx
          const addr = yOff + x

          // central diffs on grayscale (safe reads with fallback)
          // @ts-ignore
          const gx = at(newG, addr - 1) - at(newG, addr + 1)
          // @ts-ignore
          const gy = at(newG, addr - width) - at(newG, addr + width)
          // @ts-ignore
          const gt = at(oldG, addr) - at(newG, addr)

          A2 += gx * gx
          A1B2 += gx * gy
          B1 += gy * gy
          C2 += gx * gt
          C1 += gy * gt
        }
      }

      // Low-texture rejection via smallest eigenvalue of structure tensor
      const trace = A2 + B1
      const disc = Math.hypot(A2 - B1, 2 * A1B2) // sqrt((A2-B1)^2 + (2A1B2)^2)
      const lambdaMin = 0.5 * (trace - disc)
      if (lambdaMin < lambdaMinThresh) continue

      const delta = A1B2 * A1B2 - A2 * B1
      const eps = 1e-6
      let u: number
      let v: number

      if (Math.abs(delta) > eps) {
        // Solve [A2 A1B2; A1B2 B1] [u v]^T = -[C2 C1]^T
        const inv = step / delta // same scaling as your original
        const dx = -(C1 * A1B2 - C2 * B1)
        const dy = -(A1B2 * C2 - A2 * C1)
        u = dx * inv
        v = dy * inv
      } else {
        // fallback (degenerate window)
        const t1 = A1B2 + A2
        const t2 = B1 + A1B2
        const norm = t1 * t1 + t2 * t2
        if (norm > eps) {
          const scale = -(C1 + C2) * (step / norm)
          u = t1 * scale
          v = t2 * scale
        } else {
          u = 0
          v = 0
        }
      }

      // gate extreme outliers
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
