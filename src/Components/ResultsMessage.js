import React, { useContext } from 'react';
import { CTX } from '../Store';

const ResultsMessage = () => {
  const [appData] = useContext(CTX);

  return (
    <>
      {appData.movieList &&
      appData.movieList.length > 0 &&
      appData.searchedMovieSerieName.length > 2 ? (
        <div className="container pt-3">
          <h2>
            {appData.movieList.length} results for "
            {appData.searchedMovieSerieName}"
          </h2>
        </div>
      ) : appData.Error && appData.Error !== '' ? (
        <div className="container pt-3">
          <h2>
            {appData.Error} for "{appData.searchedMovieSerieName}"
          </h2>
        </div>
      ) : null}
    </>
  );
};

export default ResultsMessage;
