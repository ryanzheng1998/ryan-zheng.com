import React from 'react'

interface Props<T> {
  input: T
}

const Page = <T,>(p: Props<T>): JSX.Element => {
  console.log(typeof p.input)
  return <></>
}

export default Page
