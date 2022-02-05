import React from 'react'

export const useAsyncEffect = (
  callback: () => Promise<void>,
  dependency: React.DependencyList
) => {
  React.useEffect(() => {
    ;(async () => {
      await callback()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency)
}
