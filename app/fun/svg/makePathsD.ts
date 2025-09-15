import { getClipper } from './getClipper'

export const makePathsD = async (point: number[][]) => {
  const clipper = await getClipper()

  const paths = new clipper.main.PathsD()

  point.forEach((point) => {
    const path = clipper.main.MakePathD(point)
    paths.push_back(path)
  })

  return paths
}
