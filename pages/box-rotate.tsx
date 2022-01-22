import React from 'react'
import styled from 'styled-components'

const config = {
  msPerFrame: 8, // 120 fps
}

// ----------------------
// state model
// ----------------------
interface State {
  timeStamp: number
  ticking: boolean
  boxRotation: {
    value: number
    velocity: number
    lastIdealValue: number
    lastIdealVelocity: number
    target: number
    stiffness: number
    damping: number
    precision: number
  }
}

const initState: State = {
  timeStamp: 0,
  ticking: true,
  boxRotation: {
    value: 0,
    velocity: 0,
    lastIdealValue: 0,
    lastIdealVelocity: 0,
    target: 85,
    stiffness: 170,
    damping: 26,
    precision: 0.01,
  },
}

// ----------------------
// action model
// ---------------------
export const Tick = (timeStamp: number) => ({
  type: 'TICK' as const,
  payload: timeStamp,
})

export const TriggerRotate = () => ({
  type: 'TRIGGER_ROTATE' as const,
})

type Action = ReturnType<typeof TriggerRotate> | ReturnType<typeof Tick>

// ----------------------
// pure function
// ----------------------
const stepper =
  (timeStamp: number) =>
  (lastUpdate: number) =>
  (msPerFrame: number) =>
  (unname: State['boxRotation']): State['boxRotation'] => {
    const frameToCatchUp = Math.floor((timeStamp - lastUpdate) / msPerFrame)

    const currentFrameCompletion =
      (timeStamp - lastUpdate - msPerFrame * frameToCatchUp) / msPerFrame

    // a little bit of impurity
    let newLastIdealStyleValue = unname.lastIdealValue
    let newLastIdealVelocityValue = unname.lastIdealVelocity

    // prevent catch up too many frame
    if (frameToCatchUp <= 10) {
      for (let i = 0; i < frameToCatchUp; i++) {
        ;[newLastIdealStyleValue, newLastIdealVelocityValue] = subStepper(
          msPerFrame / 1000,
          newLastIdealStyleValue,
          newLastIdealVelocityValue,
          unname.target,
          unname.stiffness,
          unname.damping,
          unname.precision
        )
      }
    }

    const [nextIdealX, nextIdealV] = subStepper(
      msPerFrame / 1000,
      newLastIdealStyleValue,
      newLastIdealVelocityValue,
      unname.target,
      unname.stiffness,
      unname.damping,
      unname.precision
    )

    const newCurrentStyle =
      newLastIdealStyleValue +
      (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion

    const newCurrentVelocity =
      newLastIdealVelocityValue +
      (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion

    return {
      ...unname,
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

const isOnRest = (uname: State['boxRotation']) => {
  if (uname.velocity !== 0) return false
  if (uname.value !== uname.target) return false

  return true
}

// ----------------------
// update
// ----------------------
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TICK':
      const newBoxRotate = stepper(action.payload)(state.timeStamp)(
        config.msPerFrame
      )(state.boxRotation)

      const boxOnRest = isOnRest(newBoxRotate)

      return {
        ...state,
        ticking: !boxOnRest,
        timeStamp: action.payload,
        boxRotation: newBoxRotate,
      }
    case 'TRIGGER_ROTATE':
      return {
        ...state,
        ticking: true,
        boxRotation: {
          ...state.boxRotation,
          target: state.boxRotation.target + 90,
        },
      }
  }
}

// ----------------------
// render
// ----------------------
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`

const Container2 = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  place-items: center;
  grid-gap: 40px;
`

const Box = styled.div`
  width: 100px;
  height: 100px;
  background: red;
`

const Page: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initState)

  const animationRef = React.useRef(0)

  const step = React.useCallback(
    (t1: number) => (t2: number) => {
      if (t2 - t1 > config.msPerFrame) {
        if (!state.ticking) {
          return
        }
        dispatch(Tick(t2))
        animationRef.current = requestAnimationFrame(step(t2))
      } else {
        animationRef.current = requestAnimationFrame(step(t1))
      }
    },
    [state.ticking]
  )

  React.useEffect(() => {
    animationRef.current = requestAnimationFrame(step(performance.now()))
    return () => cancelAnimationFrame(animationRef.current)
  }, [step])

  return (
    <Container>
      <Container2>
        <Box style={{ transform: `rotate(${state.boxRotation.value}deg)` }} />
        <button onClick={() => dispatch(TriggerRotate())}>Triger Rotate</button>
      </Container2>
    </Container>
  )
}

export default Page
