import React from 'react'
import styled from 'styled-components'
import { UserData } from '../api-interface/v1/login'
import InputWithError from '../components/atoms/InputWithError'
import { objectMap } from '../lib/objectMap'

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

export const ShowAllFormError = () => ({
  type: 'SHOW_ALL_FORM_ERROR' as const,
})

type Action =
  | ReturnType<typeof FormEditing>
  | ReturnType<typeof ShowAllFormError>

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

    case 'SHOW_ALL_FORM_ERROR':
      const newForm = objectMap(state.form)((value: any) => {
        return {
          ...value,
          showError: true,
        }
      })

      return {
        ...state,
        form: newForm,
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
        onSubmit={(e) => {
          e.preventDefault()

          dispatch(ShowAllFormError())

          const form = state.form

          if (form.username === null || form.password === null) {
            return
          }
        }}
      >
        <label>Username:{'  '}</label>
        <InputWithError
          name="username"
          type="text"
          value={state.form.username.value ?? ''}
          onChange={(e) => {
            dispatch(FormEditing(e))
          }}
          showError={state.form.username.showError}
          errorMessage={errorMessage.username}
        />

        <label>Password:{'  '}</label>
        <InputWithError
          name="password"
          type="password"
          value={state.form.password.value ?? ''}
          onChange={(e) => dispatch(FormEditing(e))}
          showError={state.form.password.showError}
          errorMessage={errorMessage.password}
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
