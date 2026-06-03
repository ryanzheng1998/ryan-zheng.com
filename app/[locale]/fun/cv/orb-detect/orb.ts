import { blobToMat } from '@/functions/blobToMat'
import { getCv } from '@/functions/getCv'

export async function orb(blob: Blob) {
  const cv = await getCv()

  // 1. Blob → Mat
  const src = await blobToMat(cv, blob)

  // 2. Convert to grayscale
  const gray = new cv.Mat()
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY)

  // 3. ORB detection
  const orb = new cv.ORB()
  const kpVec = new cv.KeyPointVector()
  const descriptors = new cv.Mat()

  orb.detectAndCompute(gray, new cv.Mat(), kpVec, descriptors)

  // 4. Convert KeyPointVector → JS array
  const keypoints: {
    x: number
    y: number
    size: number
    angle: number
    response: number
    octave: number
    class_id: number
  }[] = []

  for (let i = 0; i < kpVec.size(); i++) {
    const kp = kpVec.get(i)
    keypoints.push({
      x: kp.pt.x,
      y: kp.pt.y,
      size: kp.size,
      angle: kp.angle,
      response: kp.response,
      octave: kp.octave,
      class_id: kp.class_id,
    })
  }

  gray.delete()
  kpVec.delete()
  orb.delete()
  src.delete()

  return { keypoints, descriptors }
}
