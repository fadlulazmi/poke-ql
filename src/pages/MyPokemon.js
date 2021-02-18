import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Wrapper } from '../components'
import Navbar from '../components/Navbar';
import { PokemonContext } from '../context';

function MyPokemon() {
  const { pokemon: {myPokemons}, dispatch } = useContext(PokemonContext)
  const history = useHistory()

  const releasePokemon = pokemon => {
    const updatedMyPokemon = myPokemons.map(el => {
      if(el.pokeId === pokemon.pokeId){
        const filteredData = el.count.filter(data => data !== pokemon.nickname)
        if(filteredData && filteredData.length > 0){
          return {...el, count: filteredData}
        }
      } else {
        return el
      }
    })
    dispatch({type: 'ADD_POKEMON', pokemon: updatedMyPokemon.filter(val => val !== undefined)})
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        { myPokemons.length > 0 ? myPokemons.map((el) => {
          const {image, name, count, pokeId} = el
          return count.map((nickname, i) => (
            <Card 
              key={i} 
              data={{image, name, nickname, pokeId}} 
              onClick={() => history.push(`/pokemon/${el.name}`)} 
              release={releasePokemon}
            />
          ))
        })
        : `You didn't have pokemon`}
      </Wrapper>
    </>
  )
}
export default MyPokemon;