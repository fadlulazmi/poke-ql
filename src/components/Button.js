import React from 'react'
import styled from '@emotion/styled'

export default function Button(props) {
  const {text, onClick, children, disabled} = props


  const ButtonComponent = styled.button`
    color: white;
    border-radius: 10px;
    padding: 10px;
    width: 90%;
    max-width: 375px;
    background-color: green;
    margin: 10px;
    &:disabled {
      background-color: lightgray;
      cursor: no-drop;
      color: black;
    };
  `

  return (
    <ButtonComponent disabled={disabled} onClick={onClick}>
      {text}
      {children}
    </ButtonComponent>
  )
}
