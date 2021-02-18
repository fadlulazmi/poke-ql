import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'

export default function Navbar() {
  const history = useHistory()
  const currentPath = history.location.pathname

  const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    background-color: rgba(0, 0, 0, .8);
    color: yellow;
    position: sticky;
    top: 0;
    & > p {
      cursor: pointer;
    }
    & > p:hover {
      color: lightyellow;
    }
  `

  return (
    <Wrapper>
      {currentPath !== '/' && <p onClick={() => history.push('/')}>Home</p>}
      {currentPath !== '/my-pokemon' && <p onClick={() => history.push('/my-pokemon')}>My Pokemon</p>}      
    </Wrapper>
  )
}
