import { imageBlobToBase64 } from '@/functions/imageBlobToBase64'
import { snap } from '@/functions/snap'
import { get, set } from '../useStore'

export const changeGolden = async () => {
  const s = get()

  if (s.stream === null) {
    alert('Webcam is not enabled')
    return
  }

  const image = await snap(s.stream)

  if (image instanceof Error) {
    alert('Failed to capture image from webcam: ' + image.message)
    return
  }

  const base64 = await imageBlobToBase64(image)
  set({
    golden: base64,
  })
}
