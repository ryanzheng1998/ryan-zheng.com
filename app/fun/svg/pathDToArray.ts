import { PathsD } from 'clipper2-wasm/dist/clipper2z'

export const pathDToArray = (paths: PathsD) => {
  let points: [number, number][] = []

  for (let i = 0; i < paths.size(); i++) {
    const path = paths.get(i)

    for (let i = 0; i < path.size(); i++) {
      const path2 = path.get(i)
      points.push([Number(path2.x), Number(path2.y)])
    }
  }

  return points.flat()
}
