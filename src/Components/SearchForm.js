import React, { useContext } from 'react';
import { CTX } from '../Store';

import { requestMovies } from '../Actions/moviesActions';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const SearchForm = () => {
  const [appData, dispatcher] = useContext(CTX);

  const requestAllMovies = () => {
    let filters = {
      t: appData.searchedMovieSerieName,
      type: appData.searchedMovieSerieType
    };

    requestMovies(filters)
      .then(data => {
        console.log(data);
        dispatcher({
          type: 'TOGGLE_LOADER',
          payload: false
        });
        if (data.Search) {
          dispatcher({
            type: 'LOAD_ALL_MOVIES',
            payload: data.Search
          });
        }
      })
      .catch(err => {
        dispatcher({
          type: 'TOGGLE_LOADER',
          payload: false
        });
        console.log(err);
      });
  };

  const handleChange = e => {
    dispatcher({
      type: 'UPDATE_SEARCH_MOVIE_NAME',
      payload: e.target.value
    });
    requestAllMovies();
    if (appData.searchedMovieSerieName.length > 0) {
      dispatcher({
        type: 'TOGGLE_LOADER',
        payload: true
      });
    }
  };
  const handleCheck = e => {
    dispatcher({
      type: 'UPDATE_SEARCH_MOVIE_TYPE',
      payload: e.target.value
    });
    requestAllMovies();
  };

  const { searchedMovieSerieName } = appData;

  return (
    <Form className="text-right" onSubmit={e => e.preventDefault()}>
      <div className="row">
        <div className="col-12">
          <FormControl
            type="text"
            placeholder="Search"
            size="sm"
            value={searchedMovieSerieName}
            name="searchedMovieSerieName"
            onChange={handleChange}
            onKeyUp={handleChange}
          />

          <div key="inline-radio">
            <Form.Check
              inline
              label="Movies"
              id="Movies"
              name="MoviesOrSeriesType"
              type="radio"
              value="movies"
              onChange={handleCheck}
            />
            <Form.Check
              inline
              label="Series"
              id="Series"
              name="MoviesOrSeriesType"
              type="radio"
              value="series"
              onChange={handleCheck}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SearchForm;
