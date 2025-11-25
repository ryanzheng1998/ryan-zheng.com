import { getCv } from '@/functions/getCv'
import { get, set } from './useStore'

export const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //
  // process multiple files
  //
  const files = [...e.currentTarget.files!]

  const setResult = files.map(async (file) => {
    const imageUrl = URL.createObjectURL(file)
    const bitmap = await createImageBitmap(file)

    set((state) => ({
      images: [
        ...state.images,
        {
          blob: file,
          imageUrl,
          imageHeight: bitmap.height,
          imageWidth: bitmap.width,
          cssMatrix: undefined,
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
}
