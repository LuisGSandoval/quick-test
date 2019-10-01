import React, { useContext } from 'react';
import { CTX } from '../Store';

const MovieList = () => {
  const [
    appData
    //  , dispatcher
  ] = useContext(CTX);

  return (
    <div className="container pt-5">
      <div className="row">
        {appData.movieList.length > 0
          ? appData.movieList.map(movie => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key="id">
                <div className="card">
                  <img
                    src={
                      'https://images.unsplash.com/photo-1526512340740-9217d0159da9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=645&q=80'
                    }
                    className="card-img-top"
                    alt={'https://unsplash.com/photos/KQZZCVyEWVk'}
                  />
                  <div className="card-body">
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default MovieList;
