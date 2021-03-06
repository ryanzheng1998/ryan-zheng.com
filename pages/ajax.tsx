import React from 'react'
import styled from 'styled-components'
import { Hello } from '../api-interface/hello'
import { useAsyncEffect } from '../lib/hooks/useAsyncEffect'
import { jsonFetch } from '../lib/side-effects/jsonFetch'

// ----------------------
// state model
// ----------------------
interface State {
  hello: {
    requesting: boolean
    data: Error | Hello | null
  }
}

const initState: State = {
  hello: {
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

export const SetRemoteData = (data: Hello | Error) => ({
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
        hello: {
          ...state.hello,
          requesting: true,
        },
      }
    case 'SET_REMOTE_DATA':
      return {
        ...state,
        hello: {
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
`

const Page: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initState)

  // side effect
  useAsyncEffect(async () => {
    if (!state.hello.requesting) return

    dispatch(SetRemoteData(await jsonFetch<Hello>('/api/hello')))
  }, [state.hello.requesting])

  // render
  const content = (() => {
    if (state.hello.requesting) {
      return <p>Loading...</p>
    }

    if (state.hello.data === null) {
      return <p>No data yet</p>
    }

    if (state.hello.data instanceof Error) {
      return (
        <div>
          <p>Error</p>
          <p>Status Code: {state.hello.data.name}</p>
          <p>Status Text: {state.hello.data.message}</p>
        </div>
      )
    }

    return <pre>{JSON.stringify(state.hello.data, null, 2)}</pre>
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
