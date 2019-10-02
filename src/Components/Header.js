import React, { useContext, useEffect } from 'react';
import { CTX } from '../Store';

import SearchForm from './SearchForm';

import Spinner from 'react-bootstrap/Spinner';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  const [appData] = useContext(CTX);

  useEffect(() => {
    if (
      appData.searchedMovieSerieName &&
      appData.searchedMovieSerieName.length < 1
    ) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [appData.searchedMovieSerieName]);

  return (
    <>
      <Navbar
        bg="info"
        variant="dark"
        className={` ${
          appData.searchedMovieSerieName === '' &&
          appData.searchedMovieSerieName.length < 1
            ? 'search-full-height'
            : ''
        }`}
      >
        <div className="container">
          <Navbar.Brand href="/">Movies & Series</Navbar.Brand>
          {appData.loader && <Spinner animation="border" variant="white" />}

          <SearchForm />
        </div>
      </Navbar>
    </>
  );
};

export default Header;
