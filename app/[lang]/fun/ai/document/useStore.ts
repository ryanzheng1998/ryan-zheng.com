import { PreTrainedModel, Processor } from '@huggingface/transformers'
import { create } from 'zustand'

const initState = {
  processor: null as null | Processor,
  model: null as null | PreTrainedModel,
  file: null as null | File,
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
