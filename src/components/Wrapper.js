import React from 'react'
import styled from '@emotion/styled'

export default function Wrapper(props) {

  const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `

  return (
    <Container>
      {props.children}
    </Container>
  )
}
