import React, { useContext } from 'react';
import { CTX } from '../Store';

import { requestMovies } from '../Actions/moviesActions';

import ReactPaginate from 'react-paginate';

const Paginator = () => {
  const [appData, dispatcher] = useContext(CTX);

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
      payload: number.selected + 1
    });

    dispatcher({
      type: 'TOGGLE_LOADER',
      payload: true
    });

    let filters = {
      t: appData.searchedMovieSerieName,
      type: appData.searchedMovieSerieType,
      page: number.selected + 1
    };

    requestMovies(filters)
      .then(data => {
        console.log(data);
        dispatcher({
          type: 'TOGGLE_LOADER',
          payload: false
        });
        if (data.Search && data.Search.length > 0) {
          dispatcher({
            type: 'LOAD_ALL_MOVIES',
            payload: data.Search
          });
          dispatcher({
            type: 'LOAD_TOTAL_RESULTS_NUMBER',
            payload: data.totalResults
          });
        }
        if (data.Error) {
          dispatcher({
            type: 'LOAD_ERROR',
            payload: data.Error
          });
        } else {
          dispatcher({
            type: 'LOAD_ERROR',
            payload: ''
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

    window.scrollTo(0, 0);
  };

  return (
    <>
      {appData.totalResults > 0 && (
        <div className="container">
          <div className="d-flex justify-content-center my-5">
            <ReactPaginate
              id="react-paginate"
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={totalPaginations()}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={updatePaginator}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Paginator;
