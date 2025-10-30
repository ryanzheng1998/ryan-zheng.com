import { getCv } from './getCv'

const blobToBgrMat = async (blob: Blob) => {
  const cv = await getCv()
  const bitmap = await createImageBitmap(blob)
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0)
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  const rgba = cv.matFromImageData(imageData)
  const bgr = new cv.Mat()
  cv.cvtColor(rgba, bgr, cv.COLOR_RGBA2BGR)
  rgba.delete()
  return bgr
}

/**
 * Compare two images using template matching.
 * target: the bigger image (frame, screenshot)
 * template: the small image you want to find in target
 */
export const compareImagesTemplate = async (
  targetBlob: Blob,
  templateBlob: Blob,
): Promise<number> => {
  const cv = await getCv()

  const target = await blobToBgrMat(targetBlob)
  const template = await blobToBgrMat(templateBlob)

  // result will be (W - w + 1) x (H - h + 1)
  const resultCols = target.cols - template.cols + 1
  const resultRows = target.rows - template.rows + 1

  if (resultCols <= 0 || resultRows <= 0) {
    // template bigger than target -> cannot match
    target.delete()
    template.delete()
    return 0
  }

  const result = new cv.Mat(resultRows, resultCols, cv.CV_32FC1)

  // TM_CCOEFF_NORMED gives 0~1 where 1 is best
  cv.matchTemplate(target, template, result, cv.TM_CCOEFF_NORMED)

  // @ts-ignore
  const mm = cv.minMaxLoc(result)
  const bestScore = mm.maxVal // 0..1

  // cleanup
  target.delete()
  template.delete()
  result.delete()

  return bestScore
}
