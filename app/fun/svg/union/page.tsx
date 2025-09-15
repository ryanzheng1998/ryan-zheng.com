'use client'

import { PathsD } from 'clipper2-wasm/dist/clipper2z'
import { useEffect, useState } from 'react'
import { getClipper } from '../getClipper'
import { makePathsD } from '../makePathsD'
import { pathsToSvg } from '../pathToSvg'

export default function Page() {
  const [square, setSquare] = useState<PathsD | null>(null)
  const [circle, setCircle] = useState<PathsD | null>(null)
  const [merged, setMerged] = useState<PathsD | null>(null)

  useEffect(() => {
    const main = async () => {
      const square = await makePathsD([
        [10, 10, 110, 10, 110, 110, 10, 110, 10, 10],
      ])
      const circle = await makePathsD([
        [
          150, 100, 149, 84, 144, 69, 135, 56, 123, 47, 108, 42, 92, 42, 77, 47,
          65, 56, 56, 69, 51, 84, 50, 100, 51, 116, 56, 131, 65, 144, 77, 153,
          92, 158, 108, 158, 123, 153, 135, 144, 144, 131, 149, 116, 150, 100,
        ],
      ])
      const clipper = await getClipper()

      const merged = clipper.main.UnionD(
        square,
        circle,
        clipper.main.FillRule.NonZero,
        8,
      )

      setSquare(square)
      setCircle(circle)
      setMerged(merged)
    }

    main()
  }, [])

  if (square === null || circle === null || merged === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid h-screen w-screen place-items-center gap-6">
      {/* show inputs */}
      <svg width="300" height="300" viewBox="0 0 180 180">
        <path d={pathsToSvg(square)} fill="none" stroke="black" />
        <path d={pathsToSvg(circle)} fill="none" stroke="black" />
      </svg>
      <svg width="300" height="300" viewBox="0 0 180 180">
        <path d={pathsToSvg(merged)} fill="none" stroke="black" />
      </svg>
    </div>
  )
}
