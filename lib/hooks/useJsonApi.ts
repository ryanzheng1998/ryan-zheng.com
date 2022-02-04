import React from 'react'
import { jsonFetch } from '../side-effect/jsonFetch'

export const useJsonApi = <T>(
  url: string,
  activator: boolean,
  dataCallback: (data: T | Error) => void,
  dependency?: React.DependencyList
) => {
  React.useEffect(() => {
    if (!activator) return
    ;(async () => {
      dataCallback(await jsonFetch<T>(url))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activator, ...(dependency ?? [])])
}
