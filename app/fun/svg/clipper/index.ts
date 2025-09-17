import { getClipper } from './getClipper'
import { makePathsD } from './makePathsD'
import { simplifyPathsD } from './simplifyPathsD'
import { union } from './union'

export const clipper = async () => {
  const clipper = await getClipper()

  return {
    ...clipper,
    makePathsD: makePathsD(clipper),
    union: union(clipper),
    simplifyPathsD: simplifyPathsD(clipper),
  }
}
