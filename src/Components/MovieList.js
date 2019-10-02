import React, { useContext, useState, useEffect } from 'react';
import { CTX } from '../Store';
import { requestMovieDescription } from '../Actions/moviesActions';

const MovieList = () => {
  const [appData, dispatcher] = useContext(CTX);

  const [moviesToShow, setMoviesToShow] = useState([]);

  // Con esta función mostramos unicamente los resultados que queremos de las peliculas dependiendo de la paginación
  useEffect(() => {
    let completeMovieList =
      appData.movieList && appData.movieList.length > 0
        ? [...appData.movieList]
        : [];
    let curPage = appData.currentPage;
    let itsXPage = appData.itemsPerPage;

    let startingPoint = (curPage - 1) * itsXPage;
    let endingPoint = startingPoint + itsXPage;

    let sliced = completeMovieList.slice(startingPoint, endingPoint);

    setMoviesToShow(sliced);
  }, [appData.currentPage, appData.movieList, appData.itemsPerPage]);

  const showDescription = movieId => {
    dispatcher({
      type: 'TOGGLE_LOADER',
      payload: true
    });
    requestMovieDescription(movieId)
      .then(data => {
        dispatcher({
          type: 'TOGGLE_LOADER',
          payload: false
        });
        console.log(data);
        dispatcher({
          type: 'OPEN_MOVIE_DESCRIPTION',
          payload: !appData.showModal
        });
        dispatcher({
          type: 'LOAD_MOVIE_DESCRIPTION',
          payload: data
        });
        dispatcher({
          type: 'TOGGLE_LOADER',
          payload: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {moviesToShow.length > 0 ? (
        <div className="container pt-5">
          <div className="row">
            {moviesToShow.map(movie => (
              <div
                key={movie.imdbID}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
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
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MovieList;
