import React from 'react'
import styled from 'styled-components'
import { useRequestAnimationFrame } from '../lib/hooks/useRequestAnimationFrame'
import { defaultSpringtifyNumber } from '../lib/springtifyNumber/presents'
import { stepper } from '../lib/springtifyNumber/stepper'
import { SpringtifyNumber } from '../lib/springtifyNumber/types'

const config = {
  msPerFrame: 8, // 120 fps
}

// ----------------------
// state model
// ----------------------
interface State {
  timeStamp: number
  ticking: boolean
  boxRotation: SpringtifyNumber
}

const initState: State = {
  timeStamp: 0,
  ticking: true,
  boxRotation: { ...defaultSpringtifyNumber, target: 85 },
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
const isOnRest = (springtifyNumber: SpringtifyNumber) => {
  if (springtifyNumber.velocity !== 0) return false
  if (springtifyNumber.value !== springtifyNumber.target) return false

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
          target: state.boxRotation.target + 110,
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
  border-radius: 15px;
`

const Page: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initState)

  useRequestAnimationFrame(
    (timeStamp) => {
      if (!state.ticking) return false

      dispatch(Tick(timeStamp))
      return true
    },
    [state.ticking]
  )

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
