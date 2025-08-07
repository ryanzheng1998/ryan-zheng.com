import { MouseEvent } from 'react'
import { set } from './useStore'

export const updateMousePosition = (event: MouseEvent) => {
  const { clientX, clientY } = event
  const { innerWidth, innerHeight } = window
  const x = (clientX / innerWidth) * 100 - 50
  const y = (clientY / innerHeight) * 100 - 50

  set({ mousePosition: { x, y } })
}
