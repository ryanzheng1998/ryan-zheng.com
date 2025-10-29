import { base64ToBlob } from '@/functions/base64ToBlob'
import { compareImagesOrb } from '@/functions/compareImagesOrb'
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

  const score = await compareImagesOrb(current, goldenBlob)
  set({ similarity: score })
}
