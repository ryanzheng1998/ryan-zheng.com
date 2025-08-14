import { WheelEvent } from 'react'
import { get, set } from './useStore'

export const zoom = (e: WheelEvent) => {
  const store = get()
  const element = e.currentTarget.firstChild as HTMLElement
  const delta = Math.max(Math.min(-e.deltaY, 60), -60)
  const scaleDiff = delta / 300 + 1
  const zoom = store.zoom * scaleDiff
  const x = store.panX
  const y = store.panY
  const currentMousePositionX = (e.pageX - x) / store.zoom
  const currentMousePositionY = (e.pageY - y) / store.zoom
  const panX = x - currentMousePositionX * (zoom - store.zoom)
  const panY = y - currentMousePositionY * (zoom - store.zoom)

  element.style.transformOrigin = '0 0'
  element.style.transform = `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`

  set({
    zoom,
    panX,
    panY,
  })
}
