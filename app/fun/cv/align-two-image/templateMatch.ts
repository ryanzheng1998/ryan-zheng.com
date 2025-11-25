import { blobToMat } from '@/functions/blobToMat'
import { getCv } from '@/functions/getCv'

export const templateMatch = async (golden: Blob, current: Blob) => {
  const cv = await getCv()

  // Load images
  const matCurrent = await blobToMat(cv, current)
  const matGolden = await blobToMat(cv, golden)

  // Convert to grayscale
  const gCurrent = new cv.Mat()
  const gGolden = new cv.Mat()
  cv.cvtColor(matCurrent, gCurrent, cv.COLOR_RGBA2GRAY)
  cv.cvtColor(matGolden, gGolden, cv.COLOR_RGBA2GRAY)

  // === Template match ===
  const result = new cv.Mat()
  const method = cv.TM_CCOEFF_NORMED
  cv.matchTemplate(gCurrent, gGolden, result, method)

  // const threshold = 0.8
  // const matches: { x: number; y: number; score: number }[] = []

  // for (let y = 0; y < result.rows; y++) {
  //   for (let x = 0; x < result.cols; x++) {
  //     const score = result.floatAt(y, x)
  //     if (score >= threshold) {
  //       matches.push({ x, y, score })
  //     }
  //   }
  // }

  // @ts-ignore
  const { maxVal, maxLoc } = cv.minMaxLoc(result)

  const dx = maxLoc.x
  const dy = maxLoc.y
  const score = maxVal

  // Cleanup
  result.delete()
  gCurrent.delete()
  gGolden.delete()
  matCurrent.delete()
  matGolden.delete()

  console.log('Template match result:', { score, dx, dy })

  return { score, dx, dy }
}
