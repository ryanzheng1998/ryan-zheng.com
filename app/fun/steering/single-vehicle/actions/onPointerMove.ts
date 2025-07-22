import { useStore } from '../useStore'

export const onPointerMove = (event: MouseEvent) => {
  useStore.setState({
    mousePosition: { x: event.clientX, y: event.clientY },
  })
}
