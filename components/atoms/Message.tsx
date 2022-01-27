import React from 'react'
import styled from 'styled-components'
import Add from '../icons/Add'

interface Props {
  value: string
  handleClose: () => void
}

const Container = styled.div`
  background: #dadada60;
  border-radius: 5px;
  border: 1px #6e6e6e solid;
  display: grid;
  grid-template-columns: auto auto;
  place-items: center;

  p {
    margin: 20px 0px 20px 20px;
  }

  svg {
    transform: rotate(45deg);
    width: 20px;
    height: 20px;
    margin: 20px;
    :hover {
      cursor: pointer;
    }
  }
`

const Message: React.FC<Props> = (p) => {
  return (
    <>
      <Container>
        <p>{p.value}</p>
        <div onClick={p.handleClose}>
          <Add />
        </div>
      </Container>
    </>
  )
}

export default Message
