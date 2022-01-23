import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const config = {
  msPerFrame: 8, // 120 fps
  imageCount: 3,
}

// ----------------------
// state model
// ----------------------
interface State {
  currentPage: number
}

const initState: State = {
  currentPage: 1,
}

// ----------------------
// action model
// ---------------------
export const SetImage = (input: (page: number) => number | number) => ({
  type: 'SET_IMAGE' as const,
  payload: input,
})

type Action = ReturnType<typeof SetImage>

// ----------------------
// update
// ----------------------
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_IMAGE':
      if (typeof action.payload === 'function') {
        return {
          ...state,
          currentPage:
            ((action.payload(state.currentPage) - 1) % config.imageCount) + 1,
        }
      }

      return {
        ...state,
        currentPage: ((action.payload - 1) % config.imageCount) + 1,
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

  return (
    <Container>
      <Container2>
        <ImageContainer>
          {new Array(config.imageCount).fill(0).map((_, i) => {
            return (
              <SingleImage
                key={i}
                style={{
                  transform: `translateX(${
                    (i - state.currentPage + 1) * (960 + 40)
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
