import {
  AutoModelForVision2Seq,
  AutoProcessor,
} from '@huggingface/transformers'
import { set } from '../useStore'

const modelId = 'HuggingFaceTB/SmolVLM-500M-Instruct'

export const initModel = async () => {
  const processor = await AutoProcessor.from_pretrained(modelId, {})
  const model = await AutoModelForVision2Seq.from_pretrained(modelId, {
    dtype: {
      embed_tokens: 'fp16',
      vision_encoder: 'q4',
      decoder_model_merged: 'q4',
    },
    device: 'webgpu',
  })

  set({
    processor,
    model,
  })
}
