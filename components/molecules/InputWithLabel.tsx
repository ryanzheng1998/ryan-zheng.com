import React from 'react'
import styled from 'styled-components'
import { SpringtifyNumber } from '../../lib/springtifyNumber/types'
import InputWithError from '../atoms/InputWithError'

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  showError?: SpringtifyNumber
  errorMessage?: string | null
  label: string
}

const Container = styled.div`
  display: grid;
`

const InputWithLabel = ({ label, ...inputProps }: Props): JSX.Element => {
  return (
    <Container>
      <label>
        {label}:{'  '}
      </label>
      <InputWithError {...inputProps} />
    </Container>
  )
}

export default InputWithLabel
