import React from 'react'

export const useJsonApi = <T>(
  url: string,
  activator: boolean,
  dataCallback: (data: T | Error) => void,
  dependency?: React.DependencyList
) => {
  React.useEffect(() => {
    if (!activator) return
    ;(async () => {
      try {
        const response = await fetch(url)

        if (!response.ok) {
          const error = new Error(response.statusText)
          error.name = response.status.toString()

          dataCallback(error)
          return
        }

        try {
          const json = await response.json()
          dataCallback(json)
        } catch (e) {
          console.log('Something went wrong')
        }
      } catch (e) {
        const NETWORK_ERROR = new Error(
          'Can not connect to server. Check your connection and try again.'
        )
        dataCallback(NETWORK_ERROR)
        return
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activator, ...(dependency ?? [])])
}
