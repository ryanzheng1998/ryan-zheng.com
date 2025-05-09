import { JSX } from 'react'
import { create } from 'zustand'
import { AboutMe } from './pages/AboutMe'
import { Cover } from './pages/Cover'
import { Skills } from './pages/Skills'

const initState = {
  slides: [<Cover />, <AboutMe />, <Skills />] as JSX.Element[],

  currentPage: 0,
}

export const useStore = create<typeof initState>()(() => initState)
export const set = useStore.setState
export const get = useStore.getState
