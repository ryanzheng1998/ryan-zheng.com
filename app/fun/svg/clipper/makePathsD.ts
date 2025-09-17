import { getClipper } from './getClipper'

export const makePathsD =
  (clipper: Awaited<ReturnType<typeof getClipper>>) => (point: number[][]) => {
    const paths = new clipper.main.PathsD()

    point.forEach((point) => {
      const path = clipper.main.MakePathD(point)
      paths.push_back(path)
    })

    return paths
  }
