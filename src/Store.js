import React, { useReducer } from 'react';

const CTX = React.createContext();

export { CTX };

// Reducer

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_BAR':
      return {
        ...state,
        searchedMovie: action.payload
      };

    default:
      return Error('reducer error');
  }
}

// Initial state
const initialState = {
  searchedMovie: '',
  movieList: [{}, {}, {}, {}]
};

export default function Store(props) {
  const stateHook = useReducer(reducer, initialState);
  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
