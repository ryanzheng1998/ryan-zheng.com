import { Vector } from '@/structure/Vector'
import { useStore } from '../useStore'

export const onPointerMove = (event: MouseEvent) => {
  useStore.setState({
    mousePosition: new Vector(event.clientX, event.clientY),
  })
}
