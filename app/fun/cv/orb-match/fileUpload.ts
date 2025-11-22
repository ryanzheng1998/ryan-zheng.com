import { getCv } from '@/functions/getCv'
import { orb } from './orb'
import { get, useStore } from './useStore'

export const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = [...e.currentTarget.files!]

  files.forEach(async (file) => {
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
        },
      ],
    }))
  })

  const s = get()
  const cv = await getCv()

  const matcher = new cv.BFMatcher()
  const first = s.images[0]!

  const others = s.images.slice(1)

  //   others.forEach((img) => {
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

  //     console.log(matchArray)
  //   })
}
