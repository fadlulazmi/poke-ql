import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../queries';
import { PokemonContext } from '../context';
import { useHistory } from 'react-router-dom';
import { Button, Card, Wrapper } from '../components';
import Navbar from '../components/Navbar';

function Home() {
  const { pokemon: { myPokemons, listPokemons }, dispatch } = useContext(PokemonContext)
  const history = useHistory()
  const [ limit ] = useState(10)
  const [ offset, setOffset ] = useState(0)
  const { loading, data, error } = useQuery(GET_POKEMONS, {
    variables: { limit, offset }
  });
  useEffect(() => {
    if(!loading){
      let queryResults = data.pokemons.results
      let pokemonsData = queryResults.map(el => {
        let found = myPokemons.filter(mine => mine.name === el.name )
        const count = found && found.length > 0 ? found[0].count : []
        return {...el, count}
      })
      dispatch({ type: 'GET_LIST_POKEMON', listPokemons: pokemonsData })
    }
  }, [data])

  useEffect(() => () => dispatch({ type: 'RESET_LIST_POKEMON' }), [])

  const seeMore = () => {
    setOffset(offset + limit)
  }
    
  if (error) return <p>error</p>
  
  return (
    <>
      <Navbar />
      <Wrapper>
        { listPokemons.map((el, index) => (
          <Card key={index} data={el} onClick={() => history.push(`/pokemon/${el.name}`)}/>
        ))}
      </Wrapper>
      <Wrapper>
        <Button disabled={loading} onClick={seeMore}>{loading ? 'Loading...' : 'See More'}</Button>
      </Wrapper>
    </>
  )
}
export default Home;