import React from 'react'
import styled from 'styled-components'
import { useAsyncEffect } from '../lib/hooks/useAsyncEffect'
import { blobFetch } from '../lib/side-effect/blobFetch'

// ----------------------
// state model
// ----------------------
interface State {
  image: {
    requesting: boolean
    data: Error | Blob | null
  }
}

const initState: State = {
  image: {
    requesting: true,
    data: null,
  },
}

// ----------------------
// action model
// ----------------------
export const GetRemoteData = () => ({
  type: 'GET_REMOTE_DATA' as const,
})

export const SetRemoteData = (data: Blob | Error) => ({
  type: 'SET_REMOTE_DATA' as const,
  payload: data,
})

type Action =
  | ReturnType<typeof GetRemoteData>
  | ReturnType<typeof SetRemoteData>

// ----------------------
// update
// ----------------------
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'GET_REMOTE_DATA':
      return {
        ...state,
        image: {
          ...state.image,
          requesting: true,
        },
      }
    case 'SET_REMOTE_DATA':
      return {
        ...state,
        image: {
          data: action.payload,
          requesting: false,
        },
      }
  }
}

// ----------------------
// render and side effect
// ----------------------
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`

const Container2 = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  max-width: 70%;
`

const StyledImage = styled.img`
  width: 100%;
`

const Page: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initState)

  // side effect
  useAsyncEffect(async () => {
    if (!state.image.requesting) return

    dispatch(
      SetRemoteData(await blobFetch('/photo-gallery/Screenshot (1).png'))
    )
  }, [state.image.requesting])

  // render
  const content = (() => {
    if (state.image.requesting) {
      return <p>Loading...</p>
    }

    if (state.image.data === null) {
      return <p>No data yet</p>
    }

    if (state.image.data instanceof Error) {
      return (
        <div>
          <p>Error</p>
          <p>Status Code: {state.image.data.name}</p>
          <p>Status Text: {state.image.data.message}</p>
        </div>
      )
    }

    const imageUrl = URL.createObjectURL(state.image.data)

    return <StyledImage alt="Random Image" src={imageUrl} />
  })()

  return (
    <>
      <Container>
        <Container2>
          <button onClick={() => dispatch(GetRemoteData())}>
            Get Remote Data
          </button>
          {content}
        </Container2>
      </Container>
    </>
  )
}

export default Page
