export async function rotateBlob(blob: Blob, angleDeg: number): Promise<Blob> {
  // Load bitmap
  const bitmap = await createImageBitmap(blob)

  const w = bitmap.width
  const h = bitmap.height

  // Create a canvas with ORIGINAL size
  const canvas = new OffscreenCanvas(w, h)
  const ctx = canvas.getContext('2d')!

  // Convert degrees to radians
  const rad = (angleDeg * Math.PI) / 180

  // Translate to the center
  ctx.translate(w / 2, h / 2)

  // Rotate
  ctx.rotate(rad)

  // Draw the image centered
  ctx.drawImage(bitmap, -w / 2, -h / 2)

  // Return a Blob
  return await canvas.convertToBlob()
}
