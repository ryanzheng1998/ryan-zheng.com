'use client'
import { useEffect } from 'react'
import { nextPage } from './actions/nextPage'
import { prevPage } from './actions/prevPage'
import { useStore } from './useStore'

export default function Page() {
  const store = useStore()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextPage()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          prevPage()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div
      onClick={() => {
        nextPage()
      }}
      className="relative h-screen w-screen bg-gradient-to-br from-white to-gray-100"
    >
      {store.slides[store.currentPage]}
      <label className="absolute bottom-0 right-0 m-5 text-3xl">
        {store.currentPage + 1}
      </label>
    </div>
  )
}
