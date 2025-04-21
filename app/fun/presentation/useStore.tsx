import { JSX } from 'react'
import { create } from 'zustand'
import { Introduction } from './pages/Introduction'
import { Title } from './pages/Title'

const initState = {
  slides: [<Title />, <Introduction />] as JSX.Element[],

  currentPage: 0,
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
