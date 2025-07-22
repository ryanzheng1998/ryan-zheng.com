import { pipeline } from '@huggingface/transformers'

export const init = async () => {
  const pipe = await pipeline(
    'document-question-answering',
    'Xenova/donut-base-finetuned-docvqa',
    {
      device: 'webgpu',
    },
  )

  const question = 'what is the longest side of the triangle?'

  const image = await fetch('/test.webp')
  const imageBlob = await image.blob()
  const result = await pipe(imageBlob, question)

  console.log('result', result)
}
