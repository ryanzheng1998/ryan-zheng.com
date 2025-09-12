'use client'
import { Path, Project } from 'paper/dist/paper-core'

const circlePath = `M150 100
A50 50 0 1 0 50 100
A50 50 0 1 0 150 100 Z
`

const squarePath = `M10 10 L110 10 L110 110 L10 110 L10 10 Z`

export default function Page() {
  const project = new Project('')
  const square = new Path(squarePath)
  const circle = new Path(circlePath)
  // PaperOffset.offsetStroke(circle, 10, { cap: 'round' })
  const united = circle.unite(square)
  const svg = united.exportSVG() as SVGElement
  const d = svg.getAttribute('d')
  project.remove()

  return (
    <div className="grid h-screen w-screen place-items-center">
      <svg width="300" height="300" viewBox="0 0 180 180">
        <path d={squarePath} fill="none" stroke="black" />
        <path d={circlePath} fill="none" stroke="black" />
      </svg>
      <svg width="300" height="300" viewBox="0 0 180 180">
        <path d={d ?? ''} fill="none" stroke="black" />
      </svg>
    </div>
  )
}
