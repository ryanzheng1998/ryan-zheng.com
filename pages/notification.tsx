import React from 'react'
import styled from 'styled-components'
import Message from '../components/atoms/Message'
import { useRequestAnimationFrame } from '../lib/hooks/useRequestAnimationFrame'
import { remove } from '../lib/remove'
import { generateKey } from '../lib/side-effect/generateKey'
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
  messages: {
    id: string
    value: string
  }[]
}

const initState: State = {
  timeStamp: 0,
  ticking: true,
  messages: [],
}

// ----------------------
// action model
// ---------------------
export const Tick = (timeStamp: number) => ({
  type: 'TICK' as const,
  payload: timeStamp,
})

export const AddMessage = (id: string, message: string) => ({
  type: 'ADD_MESSAGE' as const,
  payload: { id, message },
})

export const DeleteMessage = (index: number) => ({
  type: 'DELETE_MESSAGE' as const,
  payload: index,
})

type Action =
  | ReturnType<typeof Tick>
  | ReturnType<typeof AddMessage>
  | ReturnType<typeof DeleteMessage>

// ----------------------
// update
// ----------------------
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        timeStamp: action.payload,
      }
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: action.payload.id, value: action.payload.message },
        ],
      }
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: remove(action.payload)(1)(state.messages),
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

const MessageContainer = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
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
    <>
      <MessageContainer>
        {state.messages.map((v, i) => {
          return (
            <Message
              value={v.value}
              key={v.id}
              handleClose={() => dispatch(DeleteMessage(i))}
            />
          )
        })}
      </MessageContainer>
      <Container>
        <button
          onClick={(e) => {
            const uuid = generateKey()
            dispatch(AddMessage(uuid, `Message added. Id: ${uuid}`))
          }}
        >
          Show message
        </button>
      </Container>
    </>
  )
}

export default Page
