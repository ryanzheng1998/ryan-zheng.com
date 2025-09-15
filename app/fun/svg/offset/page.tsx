'use client'

import { useEffect, useState } from 'react'

import type {
  Clipper2ZFactoryFunction,
  MainModule,
  Paths64,
} from 'clipper2-wasm/dist/clipper2z'
// @ts-ignore
import * as _Clipper2ZFactory from 'clipper2-wasm/dist/umd/clipper2z'
const Clipper2ZFactory =
  _Clipper2ZFactory as unknown as Clipper2ZFactoryFunction

export default function Page() {
  const [clipper, setClipper] = useState<MainModule | null>(null)

  // Load WASM once in the browser
  useEffect(() => {
    const main = async () => {
      const mod = await Clipper2ZFactory({
        locateFile: () => '/clipper2z.wasm',
      })
      setClipper(mod)
    }

    main()
  }, [])

  if (!clipper)
    return (
      <div className="grid h-screen w-screen place-items-center">loading…</div>
    )

  const square = clipper.MakePath64([
    10, 10, 110, 10, 110, 110, 10, 110, 10, 10,
  ])

  const a = new clipper.Paths64()
  a.push_back(square)

  const merged = clipper.InflatePaths64(
    a,
    20,
    clipper.JoinType.Round,
    clipper.EndType.Polygon,
    0,
    0,
  )

  return (
    <div className="grid h-screen w-screen place-items-center gap-6">
      <svg width="300" height="300" viewBox="-100 -100 280 280">
        <path d={pathsToSvg(a)} fill="none" stroke="black" />
        <path d={pathsToSvg(merged)} fill="none" stroke="black" />
      </svg>
    </div>
  )
}

const pathsToSvg = (paths: Paths64) => {
  let points: [number, number][] = []

  for (let i = 0; i < paths.size(); i++) {
    const path = paths.get(i)

    for (let i = 0; i < path.size(); i++) {
      const path2 = path.get(i)
      points.push([Number(path2.x), Number(path2.y)])
    }
  }

  const d = 'M' + points.map((p) => p.join(' ')).join(' L') + ' Z'

  return d
}
