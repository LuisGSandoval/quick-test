import React, { useContext } from 'react';
import { CTX } from '../Store';

import { requestMovies } from '../Actions/moviesActions';

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
    // if()
    requestMovies(filters)
      .then(data => {
        console.log(data);
        dispatcher({
          type: 'LOAD_ALL_MOVIES',
          payload: data.Search
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const { searchedMovieSerieName } = appData;

  return (
    <Navbar bg="info" variant="dark" className="justify-content-between">
      <div className="container">
        <Navbar.Brand href="#home">Movies & Series</Navbar.Brand>

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
