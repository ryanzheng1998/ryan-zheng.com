import React from 'react'
import { RefreshResponse } from '../../api-interface/v1/refresh-access-token'
import { GlobalContext, SetAccessToken } from '../../pages/_app'

export const useAuthJsonApi = <T>(
  url: string,
  activator: boolean,
  dataCallback: (data: T | Error) => void,
  dependency?: React.DependencyList
) => {
  const {
    dispatch,
    userData: { inMemoryAccessToken },
  } = React.useContext(GlobalContext)

  React.useEffect(() => {
    if (!activator) return
    ;(async () => {
      if (inMemoryAccessToken !== null) {
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${inMemoryAccessToken}`,
          },
        }

        try {
          const response = await fetch(url, options)

          if (response.ok) {
            try {
              const json = await response.json()
              dataCallback(json)
            } catch (e) {
              console.log('Something went wrong')
            }
          }

          if (!response.ok) {
            const error = new Error(response.statusText)
            error.name = response.status.toString()

            if (error.name !== '401') {
              dataCallback(error)
              return
            }
            // continue, the access token may be expired
          }
        } catch (e) {
          const NETWORK_ERROR = new Error(
            'Can not connect to server. Check your connection and try again.'
          )
          dataCallback(NETWORK_ERROR)
          return
        }
      }

      const newToken = await (async () => {
        try {
          const response = await fetch('/api/v1/refresh-access-token')

          if (response.ok) {
            try {
              const json: RefreshResponse = await response.json()
              dispatch(SetAccessToken(json.token))
              return json.token
            } catch (e) {
              console.log('Something went wrong')
            }
          }

          if (!response.ok) {
            const error = new Error(response.statusText)
            error.name = response.status.toString()

            dataCallback(error)
            return
          }
        } catch (e) {
          const NETWORK_ERROR = new Error(
            'Can not connect to server. Check your connection and try again.'
          )
          dataCallback(NETWORK_ERROR)
          return
        }
      })()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activator, ...(dependency ?? [])])
}
