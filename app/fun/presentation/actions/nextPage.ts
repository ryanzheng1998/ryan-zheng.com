import { get, set } from '../useStore'

export const nextPage = () => {
  const s = get()

  if (s.currentPage === s.slides.length - 1) {
    set({
      currentPage: 0,
    })
    return
  }

  set({
    currentPage: s.currentPage + 1,
  })
}
