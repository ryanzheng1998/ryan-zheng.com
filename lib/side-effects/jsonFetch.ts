export const jsonFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T | Error> => {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      const error = new Error(response.statusText)
      error.name = response.status.toString()

      return error
    }

    try {
      const json = await response.json()
      return json
    } catch (e) {
      const JSON_PARSE_FAIL = new Error('Fail to parse response body into json')
      return JSON_PARSE_FAIL
    }
  } catch (e) {
    const NETWORK_ERROR = new Error(
      'Can not connect to server. Check your connection and try again.'
    )
    return NETWORK_ERROR
  }
}
