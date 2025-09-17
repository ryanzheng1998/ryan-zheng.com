import { PathsD } from 'clipper2-wasm/dist/clipper2z'
import { getClipper } from './getClipper'

export const simplifyPathsD =
  (clipper: Awaited<ReturnType<typeof getClipper>>) =>
  (path: PathsD, epsilon: number = 1) => {
    return clipper.main.SimplifyPathsD(path, epsilon, true)
  }
