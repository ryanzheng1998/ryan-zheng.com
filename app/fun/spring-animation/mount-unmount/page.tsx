'use client'

import { useState } from 'react'
import { useSpring } from './useSpring'

export default function Home() {
  const [show, setShow] = useState(true)

  const ref = useSpring<HTMLDivElement>({
    springPosition: show ? 0 : 1,
    transform: (position, element) => {
      element.style.opacity = `${position}`
    },
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      <div className="grid place-items-center gap-7">
        <div className="text-9xl" ref={ref}>
          ✌️
        </div>
        <button
          className="rounded bg-blue-500 px-2 py-3 text-white"
          onClick={() => setShow((x) => !x)}
        >
          Toggle Show
        </button>
      </div>
    </div>
  )
}
