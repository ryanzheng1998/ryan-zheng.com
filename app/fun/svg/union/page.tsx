'use client'

import { useEffect, useState } from 'react'

// Factory (UMD) + types
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
    let cancelled = false
    ;(async () => {
      const mod = await Clipper2ZFactory({
        locateFile: (f) => (f.endsWith('.wasm') ? '/clipper2z.wasm' : f),
      })
      if (!cancelled) setClipper(mod)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (!clipper)
    return (
      <div className="grid h-screen w-screen place-items-center">loading…</div>
    )

  const square = clipper.MakePath64([
    10, 10, 110, 10, 110, 110, 10, 110, 10, 10,
  ])
  const circle = clipper.MakePath64([
    150, 100, 149, 84, 144, 69, 135, 56, 123, 47, 108, 42, 92, 42, 77, 47, 65,
    56, 56, 69, 51, 84, 50, 100, 51, 116, 56, 131, 65, 144, 77, 153, 92, 158,
    108, 158, 123, 153, 135, 144, 144, 131, 149, 116, 150, 100,
  ])

  const a = new clipper.Paths64()
  a.push_back(square)
  const b = new clipper.Paths64()
  b.push_back(circle)

  // @ts-ignore
  const merged = clipper.Union64(a, b, true)

  return (
    <div className="grid h-screen w-screen place-items-center gap-6">
      {/* show inputs */}
      <svg width="300" height="300" viewBox="0 0 180 180">
        <path d={pathsToSvg(a)} fill="none" stroke="black" />
        <path d={pathsToSvg(b)} fill="none" stroke="black" />
      </svg>
      <svg width="300" height="300" viewBox="0 0 180 180">
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
