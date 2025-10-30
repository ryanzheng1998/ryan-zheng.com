import { base64ToBlob } from '@/functions/base64ToBlob'
import { compareImagesTemplate } from '@/functions/compoareImageTemplate'
import { getCv } from '@/functions/getCv'
import { snap } from '@/functions/snap'
import { get, set } from '../useStore'

export const checkSimilairty = async () => {
  const s = get()

  if (s.stream === null || s.golden === null) {
    set({ similarity: 0 })
    return
  }

  const current = await snap(s.stream)

  if (current instanceof Error) {
    set({ similarity: 0 })
    return
  }

  const goldenBlob = base64ToBlob(s.golden)

  const cv = await getCv()

  const templateScore = await compareImagesTemplate(current, goldenBlob)

  // const orbScore = await compareImageOrb(current, goldenBlob)
  // const pixelScore = await compareImagePixel(current, goldenBlob)
  set({ similarity: templateScore })
}
