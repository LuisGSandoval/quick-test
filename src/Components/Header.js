import React, { useContext } from 'react';
import { CTX } from '../Store';

import { requestMovies } from '../Actions/moviesActions';

import Spinner from 'react-bootstrap/Spinner';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const Header = () => {
  const [appData, dispatcher] = useContext(CTX);

  const handleChange = e => {
    dispatcher({
      type: 'UPDATE_SEARCH_MOVIE_NAME',
      payload: e.target.value
    });
    requestAllMovies();
    dispatcher({
      type: 'TOGGLE_LOADER',
      payload: true
    });
  };
  const handleCheck = e => {
    dispatcher({
      type: 'UPDATE_SEARCH_MOVIE_TYPE',
      payload: e.target.value
    });
    requestAllMovies();
  };
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

  const { searchedMovieSerieName } = appData;

  return (
    <Navbar bg="info" variant="dark" className="justify-content-between">
      <div className="container">
        <Navbar.Brand href="#home">Movies & Series</Navbar.Brand>
        {appData.loader && (
          <Spinner animation="border" className="float-right" variant="white" />
        )}

        <Form className="text-right" onSubmit={e => e.preventDefault()}>
          <div key="inline-radio">
            <FormControl
              type="text"
              placeholder="Search"
              size="sm"
              value={searchedMovieSerieName}
              name="searchedMovieSerieName"
              onChange={handleChange}
              onKeyUp={handleChange}
            />

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
        </Form>
      </div>
    </Navbar>
  );
};

export default Header;
