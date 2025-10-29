export const snap = async (stream: MediaStream) => {
  const track = stream.getVideoTracks()[0]
  if (track === undefined) return new Error('No video track found')
  const imageCapture = new ImageCapture(track)

  // @ts-ignore
  const bitmap = await imageCapture.grabFrame()

  // Draw it to a temporary canvas
  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  const ctx = canvas.getContext('2d')
  ctx?.drawImage(bitmap, 0, 0)

  // Convert to Blob
  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => b && resolve(b), 'image/png'),
  )

  return blob
}
