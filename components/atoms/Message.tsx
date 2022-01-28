import React from 'react'
import styled from 'styled-components'
import Add from '../../public/svg/add-outline.svg'

interface Props {
  value: string
  handleClose: () => void
  existence: number
}

const Container = styled.div`
  background: hsl(0, 0%, 95%);
  border-radius: 5px;
  outline: 1px #6e6e6e solid;
  display: grid;
  grid-template-columns: 1fr auto;
  place-items: center;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

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
  const e = p.existence

  return (
    <>
      <Container style={{ opacity: e, marginBottom: e * 20 }}>
        <p
          style={{
            fontSize: e * 16,
            margin: `${e * 20}px`,
          }}
        >
          {p.value}
        </p>

        <Add
          onClick={p.handleClose}
          style={{ width: e * 20, height: e * 20, margin: `${e * 20}px` }}
        />
      </Container>
    </>
  )
}

export default Message
