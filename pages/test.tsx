import React from 'react'
import useFetch from 'use-http'

const Page: React.FC = () => {
  const { loading, error, data, get } = useFetch(
    'http://localhost:3000',
    {},
    []
  )

  console.log(error)
  console.log(data)

  return (
    <>
      <button
        onClick={() => {
          get('/api/hello')
        }}
      >
        llll
      </button>
      {error && 'Error!'}
      {loading && 'Loading...'}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}

export default Page
