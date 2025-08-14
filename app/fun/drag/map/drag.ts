import { get, set } from './useStore'

export const drag = (e: React.PointerEvent) => {
  const element = e.currentTarget.firstChild as HTMLElement
  element.setPointerCapture(e.pointerId)
  element.style.cursor = 'grabbing'

  const mouseDownX = e.pageX - get().panX
  const mouseDownY = e.pageY - get().panY

  const onPointerMove = (e: PointerEvent) => {
    const dx = e.pageX - mouseDownX
    const dy = e.pageY - mouseDownY

    element.style.transform = `scale(${get().zoom}) translate(${dx / get().zoom}px, ${dy / get().zoom}px)`

    set({ panX: dx, panY: dy })
  }

  const onPointerUp = () => {
    element.releasePointerCapture(e.pointerId)
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup', onPointerUp)
    element.style.cursor = 'grab'
  }

  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
}
