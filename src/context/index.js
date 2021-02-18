import React, { createContext, useReducer, useEffect } from 'react';
import { pokemonReducer } from '../reducer';

export const PokemonContext = createContext();

const PokemonContextProvider = (props) => {
  const [pokemon, dispatch] = useReducer(pokemonReducer, [], () => {
    const localData = localStorage.getItem('my-pokemons');
    return {
      myPokemons: localData ? JSON.parse(localData) : [],
      listPokemons: []
    }
  });
  useEffect(() => {
    localStorage.setItem('my-pokemons', JSON.stringify(pokemon.myPokemons));
  }, [pokemon.myPokemons]);

  return (
    <PokemonContext.Provider value={{ pokemon, dispatch }}>
      {props.children}
    </PokemonContext.Provider>
  );
}
 
export default PokemonContextProvider;