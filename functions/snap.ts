export const snap = async (stream: MediaStream) => {
  const track = stream.getVideoTracks()[0]
  if (track === undefined) return new Error('No video track found')

  // @ts-ignore
  const imageCapture = new ImageCapture(track)

  const blob = await imageCapture.takePhoto()

  return blob
}
