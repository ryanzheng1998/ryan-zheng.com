export async function cropBlobImage(
  blob: Blob,
  x: number,
  y: number,
  width: number,
  height: number,
): Promise<Blob> {
  // Load blob as bitmap
  const bitmap = await createImageBitmap(blob)

  // Prepare canvas
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')!

  // Draw the cropped region onto the canvas
  ctx.drawImage(bitmap, x, y, width, height, 0, 0, width, height)

  // Convert back to Blob
  return canvas.convertToBlob()
}
