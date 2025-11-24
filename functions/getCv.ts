let cvInstance: any = null

export const getCv = async () => {
  if (cvInstance) {
    return cvInstance
  }
  const cv = await import('@techstark/opencv-js')
  cvInstance = cv
  return cv
}
