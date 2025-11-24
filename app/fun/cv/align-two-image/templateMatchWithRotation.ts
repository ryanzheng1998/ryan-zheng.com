import { rotateBlob } from '@/functions/rotateBlob'
import { templateMatch } from './templateMatch'

export const templateMatchWithRotation = async (
  golden: Blob,
  current: Blob,
) => {
  const degrees = new Array(10).fill(0).map((_, i) => i - 5)

  const resultsPromises = degrees.map(async (deg) => {
    const rotatedCurrent = await rotateBlob(current, deg)
    const res = await templateMatch(golden, rotatedCurrent)
    return {
      ...res,
      rotation: deg,
    }
  })

  const results = await Promise.all(resultsPromises)

  const bestScore = Math.max(...results.map((r) => r.score))
  const bestResult = results.find((r) => r.score === bestScore)!

  return bestResult
}
