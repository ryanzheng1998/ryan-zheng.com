import { PreTrainedModel, Processor, RawImage } from '@huggingface/transformers'

export const generateOutput = async (
  processor: Processor,
  model: PreTrainedModel,
  chatMessages: Array<{
    role: string
    content: Array<{ type: 'text' | 'image'; text?: string }>
  }>,
  images: RawImage[],
): Promise<string> => {
  //@ts-ignore
  const chat = processor.apply_chat_template(chatMessages, {
    add_generation_prompt: true,
  })

  const inputs = await processor(chat, images, {
    do_image_splitting: false,
  })

  const generatedIds = await model.generate({
    ...inputs,
    max_new_tokens: 100,
    temperature: 0,
  })

  // @ts-ignore
  const output = processor.batch_decode(
    // @ts-ignore
    generatedIds.slice(null, [inputs.input_ids.dims.at(-1), null]),
    {
      skip_special_tokens: true,
    },
  )

  return output[0]
}
