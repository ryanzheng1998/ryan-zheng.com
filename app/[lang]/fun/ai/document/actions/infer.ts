import { generateOutput } from '@/functions/generateOuput'
import { RawImage } from '@huggingface/transformers'
import { get } from '../useStore'

export const infer = async (imageBlob: Blob) => {
  const store = get()

  if (!store.processor || !store.model) {
    throw new Error('Model not initialized')
  }

  const image = await RawImage.read(imageBlob)

  const output = await generateOutput(
    store.processor,
    store.model,
    [
      {
        role: 'user',
        content: [{ type: 'image' }, { type: 'text', text: 'test' }],
      },
    ],
    [image],
  )

  return output
}
