import { SpringtifyNumber } from './types'

export const stepper =
  (timeStamp: number) =>
  (lastUpdate: number) =>
  (msPerFrame: number) =>
  (springtifyNumber: SpringtifyNumber): SpringtifyNumber => {
    const frameToCatchUp = Math.floor((timeStamp - lastUpdate) / msPerFrame)

    const currentFrameCompletion =
      (timeStamp - lastUpdate - msPerFrame * frameToCatchUp) / msPerFrame

    // a little bit of impurity
    let newLastIdealStyleValue = springtifyNumber.lastIdealValue
    let newLastIdealVelocityValue = springtifyNumber.lastIdealVelocity

    // prevent catch up too many frame
    if (frameToCatchUp <= 10) {
      for (let i = 0; i < frameToCatchUp; i++) {
        ;[newLastIdealStyleValue, newLastIdealVelocityValue] = subStepper(
          msPerFrame / 1000,
          newLastIdealStyleValue,
          newLastIdealVelocityValue,
          springtifyNumber.target,
          springtifyNumber.stiffness,
          springtifyNumber.damping,
          springtifyNumber.precision
        )
      }
    }

    const [nextIdealX, nextIdealV] = subStepper(
      msPerFrame / 1000,
      newLastIdealStyleValue,
      newLastIdealVelocityValue,
      springtifyNumber.target,
      springtifyNumber.stiffness,
      springtifyNumber.damping,
      springtifyNumber.precision
    )

    const newCurrentStyle =
      newLastIdealStyleValue +
      (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion

    const newCurrentVelocity =
      newLastIdealVelocityValue +
      (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion

    return {
      ...springtifyNumber,
      value: newCurrentStyle,
      velocity: newCurrentVelocity,
      lastIdealValue: newLastIdealStyleValue,
      lastIdealVelocity: newLastIdealVelocityValue,
    }
  }

// from https://github.com/chenglou/react-motion/blob/master/src/stepper.js
export function subStepper(
  secondPerFrame: number,
  x: number,
  v: number,
  destX: number,
  k: number,
  b: number,
  precision: number
): [number, number] {
  const reusedTuple: [number, number] = [0, 0]
  // Spring stiffness, in kg / s^2

  // for animations, destX is really spring length (spring at rest). initial
  // position is considered as the stretched/compressed position of a spring
  const Fspring = -k * (x - destX)

  // Damping, in kg / s
  const Fdamper = -b * v

  // usually we put mass here, but for animation purposes, specifying mass is a
  // bit redundant. you could simply adjust k and b accordingly
  // let a = (Fspring + Fdamper) / mass;
  const a = Fspring + Fdamper

  const newV = v + a * secondPerFrame
  const newX = x + newV * secondPerFrame

  if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
    reusedTuple[0] = destX
    reusedTuple[1] = 0
    return reusedTuple
  }

  reusedTuple[0] = newX
  reusedTuple[1] = newV
  return reusedTuple
}
