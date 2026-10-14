'use client'

import { useStore } from './useStore'

export default function Page() {
  const store = useStore()
  const grid = store.grid

  return (
    <div className="min-h-screen bg-[#f7f4ec]" aria-label="Interactive flow-vector grid">
      {store.rotation.map((row, x) => {
        return (
          <div key={x}>
            {row.map((rotation, y) => {
              return (
                <div
                  key={y}
                  className="absolute"
                  style={{
                    left: x * grid,
                    top: y * grid,
                    width: grid,
                    height: grid,
                    transform: `rotate(${rotation}deg)`,
                  }}
                  onPointerDown={(e) => {
                    const intervalId = setInterval(() => {
                      const rotation = store.rotation[x]?.[y] ?? 0
                      const newRotation = [...store.rotation]
                      newRotation[x]![y] = rotation + 7
                      useStore.setState({ rotation: newRotation })
                    }, 100)

                    const onPointerUp = (e: PointerEvent) => {
                      clearInterval(intervalId)
                    }

                    document.addEventListener('pointerup', onPointerUp, {
                      once: true,
                    })
                  }}
                >
                  <svg viewBox="0 0 512 512">
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                      d="M244 400L100 256l144-144M120 256h292"
                    />
                  </svg>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
