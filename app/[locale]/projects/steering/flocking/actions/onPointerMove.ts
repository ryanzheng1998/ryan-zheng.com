import { Vector } from '@/structure/Vector'
import { useStore } from '../useStore'

export const onPointerMove = (event: MouseEvent) => {
  const bounds = document.getElementById('flock-scene')?.getBoundingClientRect()
  if (!bounds) return
  useStore.setState({
    mousePosition: new Vector(
      ((event.clientX - bounds.left) / bounds.width) * 1920,
      ((event.clientY - bounds.top) / bounds.height) * 1080,
    ),
  })
}
