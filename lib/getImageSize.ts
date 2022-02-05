import { Vector } from './types'

export const getImageSize = (blob: Blob): Vector => {
  const img = document.createElement('img')

  const blobUrl = URL.createObjectURL(blob)
  img.src = blobUrl

  return {
    x: img.width,
    y: img.height,
  }
}
