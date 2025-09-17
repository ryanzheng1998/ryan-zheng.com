'use client'

import { PathsD } from 'clipper2-wasm/dist/clipper2z'
import { useEffect, useState } from 'react'
import { getClipper } from '../getClipper'
import { makePathsD } from '../makePathsD'
import { pathDToArray } from '../pathDToArray'

export default function Page() {
  const [square, setSquare] = useState<PathsD | null>(null)
  const [merged, setMerged] = useState<PathsD | null>(null)

  useEffect(() => {
    const main = async () => {
      const square = await makePathsD([
        [
          150, 100, 149, 84, 144, 69, 135, 56, 123, 47, 108, 42, 92, 42, 77, 47,
          65, 56, 56, 69, 51, 84, 50, 100, 51, 116, 56, 131, 65, 144, 77, 153,
          92, 158, 108, 158, 123, 153, 135, 144,
        ],
      ])

      const clipper = await getClipper()

      const merged = clipper.main.InflatePathsD(
        square,
        7,
        clipper.main.JoinType.Round,
        clipper.main.EndType.Round,
        2,
        8,
        0,
      )

      const simplified = clipper.main.SimplifyPathsD(merged, 0.1, false)

      setSquare(square)
      setMerged(simplified)
    }

    main()
  }, [])

  if (square === null || merged === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid h-screen w-screen place-items-center gap-6">
      {/* show inputs */}
      <svg width="300" height="300" viewBox="0 0 180 180">
        <polyline
          points={pathDToArray(square).join(' ')}
          fill="none"
          stroke="red"
        />
        <polyline
          points={pathDToArray(merged).join(' ')}
          fill="none"
          stroke="black"
        />
      </svg>
    </div>
  )
}
