import { getCv } from './getCv'

export const blobToMat = async (
  cv: Awaited<ReturnType<typeof getCv>>,
  blob: Blob,
) => {
  const bitmap = await createImageBitmap(blob)
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height

  const ctx = canvas.getContext('2d')!
  ctx.drawImage(bitmap, 0, 0)

  return cv.imread(canvas)
}
