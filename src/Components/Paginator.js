import React, { useContext } from 'react';
import { CTX } from '../Store';

import Pagination from 'react-bootstrap/Pagination';

const Paginator = () => {
  const [appData, dispatcher] = useContext(CTX);

  let items = [];

  const totalPaginations = () => {
    if (appData.totalResults < 1) {
      return 0;
    } else {
      let totalPaginator = Math.ceil(
        appData.totalResults / appData.itemsPerPage
      );
      return totalPaginator;
    }
  };

  const updatePaginator = number => {
    dispatcher({
      type: 'UPDATE_CURRENT_PAGE_NUMBER',
      payload: number
    });

    window.scrollTo(0, 0);
  };

  // for (
  //   let number = appData.currentPage - 2;
  //   number <= totalPaginations() <= appData.currentPage - 5
  //     ? appData.currentPage + 2
  //     : totalPaginations();
  //   number++
  // ) {
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
    <>
      {appData.totalResults > 0 && (
        <div className="container">
          <div className="d-flex justify-content-center my-5">
            <Pagination size="sm">
              <Pagination.First onClick={() => updatePaginator(1)} />
              <Pagination.Prev
                onClick={e =>
                  appData.currentPage > 1
                    ? updatePaginator(appData.currentPage - 1)
                    : e.preventDefault()
                }
              />

              {items}

              <Pagination.Next
                onClick={e =>
                  appData.currentPage < appData.totalResults
                    ? updatePaginator(appData.currentPage + 1)
                    : e.preventDefault()
                }
              />
              <Pagination.Last
                onClick={() => updatePaginator(appData.totalResults)}
              />
            </Pagination>
          </div>
        </div>
      )}
    </>
  );
};

export default Paginator;
