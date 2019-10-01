import React, { useReducer } from 'react';

const CTX = React.createContext();

export { CTX };

// Reducer

function reducer(state, action) {
  switch (action.type) {
    //******************************* */
    //*         MOVIE SEARCH          */
    //******************************* */
    case 'UPDATE_SEARCH_MOVIE_NAME':
      return {
        ...state,
        searchedMovieSerieName: action.payload
      };

    case 'UPDATE_SEARCH_MOVIE_TYPE':
      return {
        ...state,
        searchedMovieSerieType: action.payload
      };

    //******************************* */
    //*         MOVIE LIST            */
    //******************************* */
    case 'UPDATE_CURRENT_PAGE_NUMBER':
      return {
        ...state,
        currentPage: action.payload
      };

    case 'LOAD_ALL_MOVIES':
      return {
        ...state,
        movieList: action.payload
      };

    //******************************* */
    //*       MOVIE DESCRIPTION       */
    //******************************* */

    case 'OPEN_MOVIE_DESCRIPTION':
      return {
        ...state,
        showModal: action.payload
      };

    case 'LOAD_MOVIE_DESCRIPTION':
      return {
        ...state,
        movieDescription: action.payload
      };

    default:
      return Error('reducer error');
  }
}

// Initial state

const initialState = {
  searchedMovieSerieName: '',
  searchedMovieSerieType: '',

  movieList: [],

  // Movie description
  showModal: false,
  movieDescription: {},

  // Pagination
  currentPage: 1,
  itemsPerPage: 8
};

export default function Store(props) {
  const stateHook = useReducer(reducer, initialState);
  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
