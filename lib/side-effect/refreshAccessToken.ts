import { RefreshResponse } from '../../api-interface/v1/refresh-access-token'
import { jsonFetch } from './jsonFetch'

export const refreshAccessToken = async (): Promise<string | Error> => {
  const response = await jsonFetch<RefreshResponse>(
    '/api/v1/refresh-access-token'
  )
  if (response instanceof Error) return response

  return response.token
}
