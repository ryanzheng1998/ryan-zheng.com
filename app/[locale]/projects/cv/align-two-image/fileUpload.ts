import { templateMatchWithRotation } from './templateMatchWithRotation'
import { get, set } from './useStore'
import { cropBlobImage } from '@/functions/cropBlobImage'

export const fileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.currentTarget.files ?? [])
  if (files.length < 2)
    throw new Error('Choose at least two images to compare.')
  if (files.some((file) => !file.type.startsWith('image/')))
    throw new Error('Please choose image files.')
  const images = await Promise.all(
    files.map(async (file) => {
      const bitmap = await createImageBitmap(file)
      const image = {
        blob: file,
        imageUrl: URL.createObjectURL(file),
        imageHeight: bitmap.height,
        imageWidth: bitmap.width,
        transform: undefined as string | undefined,
      }
      bitmap.close()
      return image
    }),
  )
  const previous = get().images
  set({ images })
  previous.forEach((image) => URL.revokeObjectURL(image.imageUrl))
  const first = images[0]!
  const shrinkFactor = 0.4
  const reference = await cropBlobImage(
    first.blob,
    first.imageWidth * shrinkFactor,
    first.imageHeight * shrinkFactor,
    first.imageWidth * (1 - shrinkFactor * 2),
    first.imageHeight * (1 - shrinkFactor * 2),
  )
  const matched = await Promise.all(
    images.slice(1).map(async (image) => {
      const result = await templateMatchWithRotation(reference, image.blob)
      const dx = result.dx - first.imageWidth * shrinkFactor
      const dy = result.dy - first.imageHeight * shrinkFactor
      return {
        ...image,
        transform: `rotate(${result.rotation}deg) translate(${-dx}px, ${-dy}px)`,
      }
    }),
  )
  set({ images: [first, ...matched] })
}
