import React from 'react'
import styled from 'styled-components'
import Message from '../components/atoms/Message'
import { adjust } from '../lib/adjust'
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
    existence: SpringtifyNumber
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
      const newMessages = state.messages.map((v) => {
        const newExistence = stepper(action.payload)(state.timeStamp)(
          config.msPerFrame
        )(v.existence)

        return {
          ...v,
          existence: newExistence,
        }
      })

      const onRest = newMessages.every((v) => isOnRest(v.existence))

      return {
        ...state,
        ticking: !onRest,
        timeStamp: action.payload,
        messages: newMessages.filter((v) => v.existence.value !== 0),
      }
    case 'ADD_MESSAGE':
      return {
        ...state,
        ticking: true,
        messages: [
          ...state.messages,
          {
            id: action.payload.id,
            value: action.payload.message,
            existence: { ...defaultSpringtifyNumber, target: 1 },
          },
        ],
      }
    case 'DELETE_MESSAGE':
      return {
        ...state,
        ticking: true,
        messages: adjust(action.payload)((v: State['messages'][0]) => ({
          ...v,
          existence: {
            ...v.existence,
            target: 0,
          },
        }))(state.messages),
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
  margin: 30px 0px 0px 0px;
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
        {state.messages
          .slice()
          .reverse()
          .map((v, i) => {
            return (
              <Message
                value={v.value}
                key={v.id}
                handleClose={() =>
                  dispatch(DeleteMessage(state.messages.length - 1 - i))
                }
                existence={v.existence.value}
              />
            )
          })}
      </MessageContainer>
      <Container>
        <button
          onClick={() => {
            const uuid = generateKey()
            dispatch(
              AddMessage(
                uuid,
                `Message added. Id: ${uuid}`.slice(0, Math.random() * 60)
              )
            )
          }}
        >
          Show message
        </button>
      </Container>
    </>
  )
}

export default Page
