import React from 'react'
import styled from 'styled-components'
import { SpringtifyNumber } from '../../lib/springtifyNumber/types'

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  showError?: SpringtifyNumber
  errorMessage?: string | null
}

const Container = styled.div`
  position: relative;
  display: inline;
`

const ErrorContainer = styled.div`
  position: absolute;
  z-index: 10;
  background: black;
  width: 100%;

  p {
    color: white;
    margin: 2px;
  }
`

const InputWithError = ({
  showError,
  errorMessage,
  ...inputProps
}: Props): JSX.Element => {
  return (
    <Container>
      <input {...inputProps} />
      {showError && errorMessage && (
        <ErrorContainer>
          <p
            style={{
              fontSize: showError.value * 15,
              margin: showError.value * 2,
            }}
          >
            {errorMessage}
          </p>
        </ErrorContainer>
      )}
    </Container>
  )
}

export default InputWithError
