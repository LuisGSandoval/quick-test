import React, { useContext } from 'react';
import { CTX } from '../Store';
import Modal from 'react-bootstrap/Modal';
import StarRatings from 'react-star-ratings';

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
            <div className="col-12 col-sm-6">
              <div className="card">
                <img
                  src={appData.movieDescription.Poster}
                  className="card-img-top"
                  alt={appData.movieDescription.Title}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="card-body">
                <h5 className="card-title">{appData.movieDescription.Title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {appData.movieDescription.Year}
                </h6>

                <div className="my-3">
                  <StarRatings
                    rating={0}
                    starRatedColor="blue"
                    // changeRating={this.changeRating}
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="5px"
                    name="rating"
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
              </div>
            </div>
          </div>
        ) : (
          <p>No se encuentra na</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default MovieDescription;
