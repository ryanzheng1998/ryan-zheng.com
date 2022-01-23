import { SpringtifyNumber } from './types'

export const isOnRest = (springtifyNumber: SpringtifyNumber) => {
  if (springtifyNumber.velocity !== 0) return false
  if (springtifyNumber.value !== springtifyNumber.target) return false

  return true
}
