export const getCv = async () => {
  const cv = await import('@techstark/opencv-js')
  return cv
}
