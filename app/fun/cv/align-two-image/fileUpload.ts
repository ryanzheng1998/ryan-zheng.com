import { cropBlobImage } from '@/functions/cropBlobImage'
import { templateMatchWithRotation } from './templateMatchWithRotation'
import { get, set } from './useStore'

const shrinkFactor = 0.4

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
    first.imageWidth * shrinkFactor,
    first.imageHeight * shrinkFactor,
    first.imageWidth * (1 - shrinkFactor * 2),
    first.imageHeight * (1 - shrinkFactor * 2),
  )

  const others = s.images.slice(1)

  others.map(async (img) => {
    const result = await templateMatchWithRotation(cropped, img.blob)

    const dx = result.dx - first.imageWidth * shrinkFactor
    const dy = result.dy - first.imageHeight * shrinkFactor

    console.log('Alignment result:', { dx, dy, rotation: result.rotation })

    set({
      images: s.images.map((i) => {
        if (i.imageUrl === img.imageUrl) {
          return {
            ...i,
            transform: `rotate(${result.rotation}deg) translate(${-dx}px, ${-dy}px)`,
          }
        }
        return i
      }),
    })
  })
}
