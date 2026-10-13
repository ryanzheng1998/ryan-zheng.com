'use client'

import { useState } from 'react'
import { useSpring } from './useSpring'

export default function Home() {
  const [show, setShow] = useState(true)

  const ref = useSpring<HTMLDivElement>({
    springPosition: show ? 1 : 0,
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
          className="rounded-lg bg-[#183e35] px-2 py-3 text-white"
          onClick={() => setShow((x) => !x)}
        >
          Toggle Show
        </button>
      </div>
    </div>
  )
}
