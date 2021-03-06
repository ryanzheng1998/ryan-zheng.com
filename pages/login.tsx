import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { SubmitBody, UserData } from '../api-interface/v1/login'
import InputWithError from '../components/atoms/InputWithError'
import { objectMap } from '../lib/objectMap'
import { GlobalContext, SetUserData as globalSetUserData } from './_app'

// ----------------------
// state model
// ----------------------
interface FormInput<T> {
  value: T
  showError?: boolean
}

interface State {
  form: {
    username: FormInput<string | null>
    password: FormInput<string | null>
    rememberMe: FormInput<boolean>
  }
  userData: {
    requesting: boolean
    data: Error | UserData | null
  }
}

const initState: State = {
  form: {
    username: {
      value: null,
      showError: false,
    },
    password: {
      value: null,
      showError: false,
    },
    rememberMe: {
      value: false,
    },
  },
  userData: {
    requesting: false,
    data: null,
  },
}

// ----------------------
// action model
// ----------------------
export const FormEditing = (event: React.ChangeEvent<HTMLInputElement>) => ({
  type: 'FORM_INPUT' as const,
  payload: event,
})

export const Submit = () => ({
  type: 'SUBMIT' as const,
})

export const SetUserData = (data: UserData | Error) => ({
  type: 'SET_USER_DATA' as const,
  payload: data,
})

type Action =
  | ReturnType<typeof FormEditing>
  | ReturnType<typeof Submit>
  | ReturnType<typeof SetUserData>

// ----------------------
// update
// ----------------------
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FORM_INPUT':
      const { target } = action.payload
      const { name } = target

      const value = target.type === 'checkbox' ? target.checked : target.value

      if (name !== 'username' && name !== 'password' && name !== 'rememberMe') {
        return state
      }

      return {
        ...state,
        form: {
          ...state.form,
          [name]: {
            ...state.form[name],
            value: value,
            showError: true,
          },
        },
      }
    case 'SUBMIT':
      return {
        ...state,
        userData: {
          requesting: true,
          data: null,
        },
      }
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: {
          requesting: false,
          data: action.payload,
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

  form {
    display: grid;
    grid-gap: 20px;
  }
`

const Page: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const { dispatch: globalDispatch } = React.useContext(GlobalContext)
  const router = useRouter()

  // computed
  const errorMessage = {
    username: (() => {
      const value = state.form.username.value
      if (value === '' || value === null) return 'User name is required.'
      if (value.length < 2) return 'Username should be at least 2 character'
      return null
    })(),
    password: (() => {
      const value = state.form.password.value
      if (value === '' || value === null) return 'Password is required.'
      if (value.length < 4) return 'Password should be at least 4 character'
      return null
    })(),
  }

  return (
    <Container>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          dispatch(Submit())

          const isValid = Object.values(errorMessage).every((v) => v === null)

          // Todo: type check (instanceof
          const postBody = {
            username: state.form.username.value,
            password: state.form.password.value,
            rememberMe: state.form.rememberMe.value,
          } as SubmitBody

          if (!isValid) {
            // Todo: error warning
            return
          }

          const options = {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody),
          }
          try {
            const response = await fetch('/api/v1/login', options)

            if (!response.ok) {
              const error = new Error(response.statusText)
              error.name = response.status.toString()

              dispatch(SetUserData(error))
              return
            }

            try {
              const json = (await response.json()) as UserData
              dispatch(SetUserData(json))
              globalDispatch(
                globalSetUserData(json.name, json.permissions, json.token)
              )

              router.push(json.redirect)
            } catch (e) {
              console.log('Something went wrong')
            }
          } catch (e) {
            const NETWORK_ERROR = new Error(
              'Can not connect to server. Check your connection and try again.'
            )
            dispatch(SetUserData(NETWORK_ERROR))
            return
          }
        }}
      >
        <label>Username:{'  '}</label>
        <input
          name="username"
          type="text"
          value={state.form.username.value ?? ''}
          onChange={(e) => {
            dispatch(FormEditing(e))
          }}
        />

        <label>Password:{'  '}</label>
        <input
          name="password"
          type="password"
          value={state.form.password.value ?? ''}
          onChange={(e) => dispatch(FormEditing(e))}
        />

        <label>Remember Me: {'  '}</label>
        <input
          name="rememberMe"
          type="checkbox"
          checked={state.form.rememberMe.value}
          onChange={(e) => dispatch(FormEditing(e))}
        />

        <input type="submit" value="Submit" />
      </form>
    </Container>
  )
}

export default Page
