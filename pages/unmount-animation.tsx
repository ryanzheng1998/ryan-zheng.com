import React from 'react'
import styled from 'styled-components'
import { useRequestAnimationFrame } from '../lib/hooks/useRequestAnimationFrame'
import { isOnRest } from '../lib/springtifyNumber/isOnRest'
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
  show: SpringtifyNumber
}

const initState: State = {
  timeStamp: 0,
  ticking: true,
  show: { ...defaultSpringtifyNumber, target: 100 },
}

// ----------------------
// action model
// ----------------------
export const Tick = (timeStamp: number) => ({
  type: 'TICK' as const,
  payload: timeStamp,
})

export const ToggleEmoji = () => ({
  type: 'TOGGLE_EMOJI' as const,
})

type Action = ReturnType<typeof ToggleEmoji> | ReturnType<typeof Tick>

// ----------------------
// update
// ----------------------
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TICK':
      const newShow = stepper(action.payload)(state.timeStamp)(
        config.msPerFrame
      )(state.show)

      const showOnRest = isOnRest(newShow)

      return {
        ...state,
        ticking: !showOnRest,
        timeStamp: action.payload,
        show: newShow,
      }
    case 'TOGGLE_EMOJI':
      return {
        ...state,
        ticking: true,
        show: {
          ...state.show,
          target: state.show.target === 100 ? 0 : 100,
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

const EmojiConainer = styled.div`
  font-size: 60px;
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
        {state.show.value !== 0 && (
          <EmojiConainer
            style={{
              opacity: state.show.value / 100,
            }}
          >
            ✌️
          </EmojiConainer>
        )}
        <button onClick={() => dispatch(ToggleEmoji())}>Toggle Emoji</button>
      </Container2>
    </Container>
  )
}

export default Page
