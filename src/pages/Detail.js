import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GET_POKEMON } from '../queries';
import { PokemonContext } from '../context';
import styled from '@emotion/styled';
import toast from 'toasted-notes'
import Navbar from '../components/Navbar';
import { Wrapper } from '../components';

function Detail() {
  const { name } = useParams()
  const { pokemon: {myPokemons}, dispatch } = useContext(PokemonContext)
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { name }
  })
  const [openNickName, setOpenNickName] = useState(false)

  const pokemonData = data && data.pokemon

  const handleCatch = () => {
    const random = Math.random();
    if (random > 0.5) {
      toast.notify('Yeay. Successfully catched')
      setOpenNickName(true)
    } else {
      toast.notify('Oops, it runs away. Try again')
    }
  }

  const submitNickName = e => {
    e.preventDefault()
    const nickname = e.target[0].value
    let isExist = false
    let updatedData = myPokemons.map(el => {
      if(pokemonData.name === el.name){
        isExist = true
        return {...el, count: el.count.concat([nickname])}
      } else {
        return el
      }
    })
    if(isExist){
      dispatch({ type: 'ADD_POKEMON', pokemon: updatedData })
    } else {
      dispatch({ type: 'ADD_POKEMON', pokemon: [...updatedData, {
        name: pokemonData.name,
        pokeId: pokemonData.id,
        count: [nickname],
        image: getImageUrl(pokemonData.id)
      }] })
    }
    toast.notify(`Yeay. Successfully save ${nickname}`)
    setOpenNickName(false)
  }

  const attributes = [
    { title: 'types', property: 'type' },
    { title: 'abilities', property: 'ability' }
  ]
  
  if (loading) return <Wrapper><p>Loading...</p></Wrapper>
  if (error) return <Wrapper><p>error</p></Wrapper>

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 375px;
    padding-top: 50px;
    & > div {
      width: 90%;
    };
    & > div > div {
      display: grid;
      grid-template-columns: 70px 235px;
      grid-gap: 15px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid black;
    };
    & > div > div > div {
      display: grid;
      grid-template-columns: 100px 100px;
      grid-gap: 15px;
    };
    h4 {
      margin: 0;
      text-transform: capitalize;
    };
  `

  const Image = styled.img`
    width: 150px
  `

  const Button = styled.button`
    position: sticky;
    bottom: 10px;
    width: 95%;
    height: 40px;
    background-color: green;
    border-radius: 7px;
    color: white;
    &:disabled {
      background-color: lightgray;
      cursor: no-drop;
      color: black;
    };
  `

  const getImageUrl = id => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <Wrapper>
      <Navbar />
      
      <Container>
        <Image src={pokemonData.id ? getImageUrl(pokemonData.id) : ''} alt={pokemonData.name}/>
        {openNickName ? (
          <section>
            <form onSubmit={submitNickName}>
              <small>Nick Name</small>
              <br/>
              <input placeholder="ex: superhero" />
            </form>
          </section>
        ) : (
          <div>
            <div>
              <h1>{pokemonData.name}</h1>
            </div>
            { attributes.map((attribute, i) => (
              <div key={i}>
                <h4>{attribute.title}</h4>
                <div >
                  {pokemonData[attribute.title] && pokemonData[attribute.title].map((el, index) => (
                    <div key={index}>{el[attribute.property].name}</div>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h4>Moves</h4>
              <div>
                {pokemonData.moves && pokemonData.moves.map((el, index) => (
                  <div key={index}>{el.move.name}</div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!openNickName && <Button disabled={!pokemonData.id} onClick={handleCatch}>Catch!</Button>}
      </Container>
    </Wrapper>
  );
}
export default Detail;