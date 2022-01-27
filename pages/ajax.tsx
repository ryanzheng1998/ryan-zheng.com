import React from 'react'
import styled from 'styled-components'

// ----------------------
// state model
// ----------------------
interface Hello {
  name: string
}

interface State {
  hello: {
    loading: boolean
    data: Error | Hello | null
  }
}

const initState: State = {
  hello: {
    loading: false,
    data: null,
  },
}

// ----------------------
// action model
// ----------------------
export const GetRemoteData = () => ({
  type: 'GET_REMOTE_DATA' as const,
})

export const SetRemoteData = (data: Hello | null | Error) => ({
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
          loading: true,
        },
      }
    case 'SET_REMOTE_DATA':
      return {
        ...state,
        hello: {
          data: action.payload,
          loading: false,
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
`

const Page: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initState)

  React.useEffect(() => {
    if (!state.hello.loading) return
    ;(async () => {
      try {
        const response = await fetch('/api/hello')

        if (!response.ok) {
          const error = new Error(response.statusText)
          error.name = response.status.toString()

          dispatch(SetRemoteData(error))
          return
        }

        try {
          const json = await response.json()
          dispatch(SetRemoteData(json))
        } catch (e) {
          console.log('Something went wrong')
        }
      } catch (e) {
        const NETWORK_ERROR = new Error(
          'No internet. Try: Checking the network cables, modem, and router'
        )
        dispatch(SetRemoteData(NETWORK_ERROR))
        return
      }
    })()
  }, [state.hello.loading])

  const content = (() => {
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
          {state.hello.loading && <p>Loading...</p>}
          {!state.hello.loading && content}
        </Container2>
      </Container>
    </>
  )
}

export default Page
