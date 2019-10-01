import React, { useContext } from 'react';
import { CTX } from '../Store';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const Header = () => {
  const [appData, dispatcher] = useContext(CTX);

  const handleChange = e => {
    dispatcher({
      type: 'UPDATE_SEARCH_BAR',
      payload: e.target.value
    });
  };
  return (
    <Navbar bg="info" variant="dark" className="justify-content-between">
      <div className="container">
        <Navbar.Brand href="#home">Movies & Series</Navbar.Brand>

        <Form className="text-right">
          <div key="inline-radio">
            <FormControl
              type="text"
              placeholder="Search"
              // className="mr-sm-2"
              size="sm"
              value={appData.searchedMovie}
              name="searchedMovie"
              onChange={handleChange}
            />

            <Form.Check inline label="Movies" type="radio" id="Movies" />
            <Form.Check inline label="Series" type="radio" id="Series" />
          </div>
        </Form>
      </div>
    </Navbar>
  );
};

export default Header;
