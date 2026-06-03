import { get, set } from '../useStore'

export const prevPage = () => {
  const s = get()

  if (s.currentPage === 0) {
    set({
      currentPage: s.slides.length - 1,
    })
    return
  }

  set({
    currentPage: s.currentPage - 1,
  })
}
