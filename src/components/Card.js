import React from 'react'
import styled from '@emotion/styled'
import { Wrapper } from '.'

export default function Card(props) {
  const {name, image, count, nickname} = props.data
  const Wrapper = styled.div`
    display: block;
    text-align: center;
    margin: 10px;
    & > button {
      background-color: red;
      border-radius: 5px;
      color: white;
      margin: 0;
    }
  `
  const Container = styled.div`
    border-radius: 10px;
    border: grey 1px solid;
    width: 150px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 200px;
    flex-direction: column;
    background-color: ${count && count.length > 0 ? 'yellow' : '#f0f481'};
    &:hover {
      background-color: #c2c63f
    }
    & > img {
      max-height: 70px;
    }
  `
  return (
    <Wrapper>
      <Container onClick={props.onClick}>
        <img src={image}/>
        <p>{name}</p>
        {count && <p>count: <b>{count.length}</b></p>}
        {nickname && <b>{nickname}</b>}
      </Container>
      {nickname && <button onClick={() => props.release(props.data)}>release</button>}
    </Wrapper>
  )
}
