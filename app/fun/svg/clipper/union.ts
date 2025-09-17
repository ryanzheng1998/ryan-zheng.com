import { PathsD } from 'clipper2-wasm/dist/clipper2z'
import { getClipper } from './getClipper'

export const union =
  (clipper: Awaited<ReturnType<typeof getClipper>>) =>
  (subject: PathsD, clip: PathsD) => {
    return clipper.main.UnionD(subject, clip, clipper.main.FillRule.NonZero, 8)
  }
