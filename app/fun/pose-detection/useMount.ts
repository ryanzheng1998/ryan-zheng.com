import { useEffect } from 'react'
import { loadModels } from './loadModels'
import { onTimeUpdate } from './onTimeUpdate'
import { get, set } from './useStore'

export const useMount = async () => {
  useEffect(() => {
    const id = requestAnimationFrame(onTimeUpdate(performance.now()))

    set({
      animationId: id,
    })

    return () => {
      const id = get().animationId
      cancelAnimationFrame(id)
    }
  }, [])

  loadModels()
}
