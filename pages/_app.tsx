import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import React from 'react'
import { NextPageWithLayout } from '../lib/types'
import { Role } from '../api-interface/v1/login'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />, pageProps)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TranslatedApp = appWithTranslation(MyApp as any)
// -------------------------------------------------------------------------------

// Redux pattern

// ----------------------
// state model
// ----------------------
interface Global {
  userData: {
    inMemoryAccessToken: string | null
    name: string | null
    permissions: Role | null
  }
  userPreference: {
    acceptTracking: boolean
  }
}

const global: Global = {
  userData: {
    name: null,
    permissions: 'admin',
    inMemoryAccessToken: null,
  },
  userPreference: {
    acceptTracking: false,
  },
}

// ----------------------
// action model
// ---------------------
export const SetAccessToken = (token: string) => ({
  type: 'SET_ACCESS_TOKEN' as const,
  payload: token,
})

export const SetUserData = (
  name: string,
  permissions: Role,
  inMemoryAccessToken: string
) => ({
  type: 'SET_USER_DATA' as const,
  payload: { name, permissions, inMemoryAccessToken },
})

export const Logout = () => ({
  type: 'LOGOUT' as const,
})

type Action =
  | ReturnType<typeof SetUserData>
  | ReturnType<typeof SetAccessToken>
  | ReturnType<typeof Logout>

// ----------------------
// update
// ----------------------
const reducer = (state: Global, action: Action): Global => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload }
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        userData: {
          ...state.userData,
          inMemoryAccessToken: action.payload,
        },
      }
    case 'LOGOUT':
      return global
  }
}

export const GlobalContext = React.createContext<
  Global & { dispatch: React.Dispatch<Action> }
>({
  ...global,
  // "dispatch" will not be null
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  dispatch: null,
})

const AppWithState = (props: AppProps): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, global)

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      <TranslatedApp {...props} />
    </GlobalContext.Provider>
  )
}

export default AppWithState
