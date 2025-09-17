import { PathsD } from 'clipper2-wasm/dist/clipper2z'

export const pathsDToArray = (pathsD: PathsD) => {
  const result: Array<number[]> = []

  for (let i = 0; i < pathsD.size(); i++) {
    const pathD = pathsD.get(i)

    const arr: number[] = []
    for (let j = 0; j < pathD.size(); j++) {
      const point = pathD.get(j)
      arr.push(point.x, point.y)
    }

    result.push(arr)
  }

  return result
}
