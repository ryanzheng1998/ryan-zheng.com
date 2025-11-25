import { getCv } from '@/functions/getCv'
import { orb } from './orb'
import { get, set } from './useStore'

export const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //
  // process multiple files
  //
  const files = [...e.currentTarget.files!]

  const setResult = files.map(async (file) => {
    const imageUrl = URL.createObjectURL(file)
    const orbResult = await orb(file)
    const bitmap = await createImageBitmap(file)

    set((state) => ({
      images: [
        ...state.images,
        {
          blob: file,
          imageUrl,
          orbResult,
          imageHeight: bitmap.height,
          imageWidth: bitmap.width,
          cssMatrix: undefined,
          goodMatches: [],
        },
      ],
    }))
  })

  await Promise.all(setResult)

  //
  // match features after all images are processed
  //
  const s = get()
  const cv = await getCv()

  console.log(cv)

  // @ts-ignore
  const matcher = new cv.BFMatcher()
  const first = s.images[0]!

  const others = s.images.slice(1)

  others.map((img) => {
    const matches = new cv.DMatchVector()

    matcher.match(
      first.orbResult.descriptors,
      img.orbResult.descriptors,
      matches,
    )

    const matchArray = []
    for (let i = 0; i < matches.size(); i++) {
      matchArray.push(matches.get(i))
    }
    console.log('matchArray', matchArray)

    const goodMatches = matchArray
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 50)

    const srcPoints = goodMatches.map(
      (m) => first.orbResult.keypoints[m.queryIdx]!,
    )
    const dstPoints = goodMatches.map(
      (m) => img.orbResult.keypoints[m.trainIdx]!,
    )

    const srcMat = cv.matFromArray(
      srcPoints.length,
      1,
      cv.CV_32FC2,
      srcPoints.flatMap((kp) => [kp.x, kp.y]),
    )
    const dstMat = cv.matFromArray(
      dstPoints.length,
      1,
      cv.CV_32FC2,
      dstPoints.flatMap((kp) => [kp.x, kp.y]),
    )

    const M = cv.estimateAffine2D(dstMat, srcMat)

    const matrixData = M.data64F
    const cssMatrix = `matrix(${matrixData[0]}, ${matrixData[3]}, ${matrixData[1]}, ${matrixData[4]}, ${matrixData[2]}, ${matrixData[5]})`

    set({
      images: s.images.map((im) => {
        if (im === img) {
          return {
            ...im,
            cssMatrix,
            goodMatches,
          }
        }
        return im
      }),
    })

    matches.delete()
  })

  matcher.delete()
}
