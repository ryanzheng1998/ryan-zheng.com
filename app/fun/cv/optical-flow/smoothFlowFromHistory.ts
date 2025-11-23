import { computeOpticalFlow } from './computeOpticalFlow'

export function smoothFlowFromHistory(
  imageHistory: Uint8ClampedArray[],
  width: number,
  height: number,
) {
  const flows = imageHistory
    .map((image, i) => {
      const nextImage = imageHistory[i + 1]
      if (!nextImage) return null
      return computeOpticalFlow(nextImage, image, width, height)
    })
    .filter((f) => f !== null)
    .reduce(
      (acc, flow) => {
        return {
          ...flow,
          zones: flow.zones.map((zone, i) => {
            const accZone = acc?.zones[i]
            if (!accZone) return zone
            return {
              ...zone,
              u: accZone.u + zone.u,
              v: accZone.v + zone.v,
            }
          }),
        }
      },
      null as null | ReturnType<typeof computeOpticalFlow>,
    )

  return flows
}
