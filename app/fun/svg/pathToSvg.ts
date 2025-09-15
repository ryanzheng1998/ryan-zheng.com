import { PathsD } from 'clipper2-wasm/dist/clipper2z'

export const pathsToSvg = (paths: PathsD) => {
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
