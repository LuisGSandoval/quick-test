import React, { useContext } from 'react';
import { CTX } from '../Store';
import Modal from 'react-bootstrap/Modal';
import Rating from 'react-rating';

const MovieDescription = () => {
  const [appData, dispatcher] = useContext(CTX);

  const handleClose = () => {
    dispatcher({
      type: 'OPEN_MOVIE_DESCRIPTION',
      payload: !appData.showModal
    });
  };

  return (
    <Modal show={appData.showModal} onHide={handleClose}>
      <Modal.Body>
        {appData.movieDescription ? (
          <div className="row">
            {appData.movieDescription.Poster !== 'N/A' && (
              <div className="col-12 col-sm-6">
                <div className="card">
                  <img
                    src={appData.movieDescription.Poster}
                    className="card-img-top"
                    alt={appData.movieDescription.Title}
                  />
                </div>
              </div>
            )}
            <div
              className={`col-12 ${
                appData.movieDescription.Poster !== 'N/A' ? 'col-sm-6' : ''
              }`}
            >
              <div className="card-body">
                <h5 className="card-title">{appData.movieDescription.Title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {appData.movieDescription.Year}
                </h6>

                <div className="my-3">
                  <Rating
                    readonly={true}
                    emptySymbol="far fa-heart text-warning mr-2"
                    fullSymbol="fas fa-heart text-warning mr-2"
                    initialRating={appData.movieDescription.imdbRating / 2}
                  />
                </div>

                <h6 className="my-3">
                  {appData.movieDescription.Genre
                    ? appData.movieDescription.Genre.split(', ').map(genre => (
                        <span
                          key={genre}
                          className="badge badge-secondary mr-1"
                        >
                          {genre}
                        </span>
                      ))
                    : null}
                </h6>

                <h6 className="card-subtitle mb-2 text-muted">
                  {appData.movieDescription.Actors}
                </h6>

                <p className="card-text">{appData.movieDescription.Plot}</p>

                <div className="text-right">
                  <button className="btn btn-info" onClick={handleClose}>
                    close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No se encuentra detalles de esta película</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MovieDescription;
