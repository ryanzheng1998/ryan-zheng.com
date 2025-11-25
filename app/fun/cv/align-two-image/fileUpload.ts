import { cropBlobImage } from '@/functions/cropBlobImage'
import { templateMatch } from './templateMatch'
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
          transform: undefined,
        },
      ],
    }))
  })

  await Promise.all(setResult)

  //
  // match features after all images are processed
  //
  const s = get()

  const first = s.images[0]!

  const cropped = await cropBlobImage(
    first.blob,
    first.imageWidth * 0.2,
    first.imageHeight * 0.2,
    first.imageWidth * 0.6,
    first.imageHeight * 0.6,
  )

  const others = s.images.slice(1)

  others.map(async (img) => {
    const result = await templateMatch(cropped, img.blob)

    const dx = result.dx - first.imageWidth * 0.2
    const dy = result.dy - first.imageHeight * 0.2

    set({
      images: s.images.map((i) => {
        if (i.imageUrl === img.imageUrl) {
          return {
            ...i,
            transform: `translate(${-dx}px, ${-dy}px) rotate(${0}deg)`,
          }
        }
        return i
      }),
    })
  })
}
