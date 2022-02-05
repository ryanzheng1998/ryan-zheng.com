import React from 'react'
import { RefreshResponse } from '../../api-interface/v1/refresh-access-token'
import { GlobalContext, SetAccessToken } from '../../pages/_app'
import { jsonFetch } from '../side-effect/jsonFetch'
import { useAsyncEffect } from './useAsyncEffect'

export const useAuthJsonApi = <T>(
  url: string,
  activator: boolean,
  dataCallback: (data: T | Error) => void,
  dependency?: React.DependencyList
) => {
  const {
    dispatch: globalDispatch,
    userData: { inMemoryAccessToken },
  } = React.useContext(GlobalContext)

  // side effect
  useAsyncEffect(async () => {
    if (!activator) return

    if (inMemoryAccessToken !== null) {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${inMemoryAccessToken}`,
        },
      }

      const data = await jsonFetch<T>(url, options)

      if (!(data instanceof Error) || data.name !== '401') {
        dataCallback(data)
        return
      }
    }

    const newToken = await jsonFetch<RefreshResponse>(
      '/api/v1/refresh-access-token'
    )

    if (newToken instanceof Error) {
      dataCallback(newToken)
      return
    }

    globalDispatch(SetAccessToken(newToken.token))

    const options2 = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${newToken.token}`,
      },
    }

    const data2 = await jsonFetch<T>(url, options2)
    dataCallback(data2)
    return
  }, [activator, ...(dependency ?? [])])
}
