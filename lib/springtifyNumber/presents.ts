import { SpringtifyNumber } from './types'

// from https://github.com/chenglou/react-motion/blob/master/src/stepper.js
export const presents = {
  noWobble: { stiffness: 170, damping: 26 }, // the default, if nothing provided
  gentle: { stiffness: 120, damping: 14 },
  wobbly: { stiffness: 180, damping: 12 },
  stiff: { stiffness: 210, damping: 20 },
}

export const defaultSpringtifyNumber: SpringtifyNumber = {
  value: 0,
  velocity: 0,
  lastIdealValue: 0,
  lastIdealVelocity: 0,
  target: 0,
  stiffness: 170,
  damping: 26,
  precision: 0.01,
}
