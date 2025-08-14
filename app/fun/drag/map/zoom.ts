import { get, set } from './useStore'

export const zoom = (e: React.WheelEvent<HTMLDivElement>) => {
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  set({ zoom: get().zoom + delta })
}
