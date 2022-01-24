import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { useRequestAnimationFrame } from '../lib/hooks/useRequestAnimationFrame'
import { SpringtifyNumber } from '../lib/springtifyNumber/types'
import {
  defaultSpringtifyNumber,
  presents,
} from '../lib/springtifyNumber/presents'
import { stepper } from '../lib/springtifyNumber/stepper'
import { isOnRest } from '../lib/springtifyNumber/isOnRest'
import { circularRestrict } from '../lib/circularRestrict'

const config = {
  msPerFrame: 8, // 120 fps
  imageCount: 3,
}

// ----------------------
// state model
// ----------------------
interface State {
  timeStamp: number
  ticking: boolean
  currentPage: SpringtifyNumber
}

const initState: State = {
  timeStamp: 0,
  ticking: true,
  currentPage: { ...defaultSpringtifyNumber, target: 1, ...presents.gentle },
}

// ----------------------
// action model
// ---------------------
export const Tick = (timeStamp: number) => ({
  type: 'TICK' as const,
  payload: timeStamp,
})

export const SetImage = (input: (page: number) => number | number) => ({
  type: 'SET_IMAGE' as const,
  payload: input,
})

type Action = ReturnType<typeof Tick> | ReturnType<typeof SetImage>

// ----------------------
// update
// ----------------------
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'TICK':
      const newCurrentPage = stepper(action.payload)(state.timeStamp)(
        config.msPerFrame
      )(state.currentPage)

      const motionOnRest = isOnRest(newCurrentPage)

      return {
        ...state,
        timeStamp: action.payload,
        ticking: !motionOnRest,
        currentPage: newCurrentPage,
      }
    case 'SET_IMAGE':
      const pageTarget = (() => {
        if (typeof action.payload === 'function') {
          return action.payload(state.currentPage.target)
        }

        return action.payload
      })()

      return {
        ...state,
        ticking: true,
        currentPage: {
          ...state.currentPage,
          target: circularRestrict(1)(config.imageCount)(pageTarget),
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

const ImageContainer = styled.div`
  position: relative;
  height: 540px;
  width: 960px;
  overflow: hidden;
  display: grid;
  place-items: center;
`
const ImageConainer2 = styled.div`
  position: relative;
  height: 540px;
  width: 960px;
`

const SingleImage = styled.div`
  position: absolute;
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
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
        <ImageContainer>
          <ImageConainer2>
            {new Array(config.imageCount).fill(0).map((_, i) => {
              return (
                <SingleImage
                  key={i}
                  style={{
                    transform: `translateX(${
                      (i - state.currentPage.value + 1) * 960
                    }px)`,
                  }}
                >
                  <Image
                    alt={`image${i + 1}`}
                    src={`/photo-gallery/Screenshot (${i + 1}).png`}
                    width={1920}
                    height={1080}
                  />
                </SingleImage>
              )
            })}
          </ImageConainer2>
        </ImageContainer>
        <ButtonContainer>
          <button onClick={() => dispatch(SetImage((page) => page - 1))}>
            Previous image
          </button>
          <button onClick={() => dispatch(SetImage((page) => page + 1))}>
            Next image
          </button>
        </ButtonContainer>
      </Container2>
    </Container>
  )
}

export default Page
