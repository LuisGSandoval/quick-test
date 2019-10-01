import React, { useContext } from 'react';
import { CTX } from '../Store';

import Pagination from 'react-bootstrap/Pagination';

const Paginator = () => {
  const [appData, dispatcher] = useContext(CTX);

  let items = [];

  const totalPaginations = () => {
    if (appData.movieList.length < 1) {
      return 0;
    } else {
      let totalPaginator = Math.ceil(
        appData.movieList.length / appData.itemsPerPage
      );
      return totalPaginator;
    }
  };

  const updatePaginator = number => {
    dispatcher({
      type: 'UPDATE_CURRENT_PAGE_NUMBER',
      payload: number
    });
  };

  for (let number = 1; number <= totalPaginations(); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === appData.currentPage}
        onClick={() => updatePaginator(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center my-5">
        <Pagination size="sm">{items}</Pagination>
      </div>
    </div>
  );
};

export default Paginator;
