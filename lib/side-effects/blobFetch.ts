export const blobFetch = async (
  url: string,
  options?: RequestInit
): Promise<Blob | Error> => {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      const error = new Error(response.statusText)
      error.name = response.status.toString()

      return error
    }

    try {
      const blob = await response.blob()
      return blob
    } catch (e) {
      const BLOB_PARSE_FAIL = new Error('Fail to parse response body into blob')
      return BLOB_PARSE_FAIL
    }
  } catch (e) {
    const NETWORK_ERROR = new Error(
      'Can not connect to server. Check your connection and try again.'
    )
    return NETWORK_ERROR
  }
}
