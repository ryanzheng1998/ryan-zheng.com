import { getCv } from '@/functions/getCv'
import { orb } from './orb'
import { get, useStore } from './useStore'

export const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //
  // process multiple files
  //
  const files = [...e.currentTarget.files!]

  const setResult = files.map(async (file) => {
    const imageUrl = URL.createObjectURL(file)
    const orbResult = await orb(file)
    const bitmap = await createImageBitmap(file)

    useStore.setState((state) => ({
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
  const matcher = new cv.DescriptorMatcher_create(
    // @ts-ignore
    cv.DescriptorMatcher_FLANNBASED.toString(),
  )
  const first = s.images[0]!

  const others = s.images.slice(1)

  //   others.map((img) => {
  //     const matches = new cv.DMatchVector()

  //     matcher.knnMatch(
  //       first.orbResult.descriptors,
  //       img.orbResult.descriptors,
  //       matches,
  //       2,
  //     )

  //     const matchArray = []
  //     for (let i = 0; i < matches.size(); i++) {
  //       matchArray.push(matches.get(i))
  //     }

  //     const goodMatches = matchArray
  //       .sort((a, b) => a.distance - b.distance)
  //       .slice(0, 50)

  //     set({
  //       images: s.images.map((im) => {
  //         if (im === img) {
  //           return {
  //             ...im,
  //             goodMatches,
  //           }
  //         }
  //         return im
  //       }),
  //     })

  //     matches.delete()
  //   })

  matcher.delete()
}
