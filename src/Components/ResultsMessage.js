import React, { useContext } from 'react';
import { CTX } from '../Store';

const ResultsMessage = () => {
  const [appData] = useContext(CTX);

  return (
    <div className="container pt-3">
      {appData.movieList.length > 0 && (
        <h2>
          {appData.movieList.length} results for "{appData.searchedMovie}"
        </h2>
      )}
    </div>
  );
};

export default ResultsMessage;
