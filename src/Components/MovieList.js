import React, { useContext, useState, useEffect } from 'react';
import { CTX } from '../Store';

const MovieList = () => {
  const [
    appData
    //  , dispatcher
  ] = useContext(CTX);

  const [moviesToShow, setMoviesToShow] = useState([]);

  // Con esta función mostramos unicamente los resultados que queremos de las peliculas dependiendo de la paginación
  useEffect(() => {
    let completeMovieList = [...appData.movieList];
    let curPage = appData.currentPage;
    let itsXPage = appData.itemsPerPage;

    let startingPoint = (curPage - 1) * itsXPage;
    let endingPoint = startingPoint + itsXPage;

    let sliced = completeMovieList.slice(startingPoint, endingPoint);

    setMoviesToShow(sliced);
  }, [appData.currentPage, appData.movieList, appData.itemsPerPage]);

  const showDescription = movieId => {
    console.log(movieId);
  };

  return (
    <div className="container pt-5">
      <div className="row">
        {moviesToShow.length > 0
          ? moviesToShow.map(movie => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
                key={movie.imdbID}
              >
                <div
                  className="card showHand"
                  onClick={() => showDescription(movie.imdbID)}
                >
                  {movie.Poster !== 'N/A' && (
                    <img
                      src={movie.Poster}
                      className="card-img-top"
                      alt={movie.Title}
                    />
                  )}
                  <div className="card-body text-center">
                    <p className="card-text">{movie.Title}</p>
                    <span className="text-mute">{movie.Year}</span>
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
