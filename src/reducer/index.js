export const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'GET_LIST_POKEMON': 
      return {
        ...state,
        listPokemons: state.listPokemons.concat(action.listPokemons)
      }
    case 'RESET_LIST_POKEMON': 
      return {
        ...state,
        listPokemons: []
      }
    case 'ADD_POKEMON':
      return {
        ...state,
        myPokemons: action.pokemon
      }
    case 'RELEASE_POKEMON':
      return state.filter( pokemon => pokemon.nickname !== action.nickname );
    default:
      return state;
  }
} 