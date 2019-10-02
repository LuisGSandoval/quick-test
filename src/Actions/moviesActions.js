import axios from 'axios';

// Esta sería mi llave privada, la cual en otras situaciones debería
// ser protegida de estar en repositorios o en la app del cliente
const apiKey = 'e894d40';
const totalQantity = '3';

export const requestMovies = filter => {
  return new Promise((resolve, reject) => {
    if (filter.t.length < 3) {
      return;
    }

    setTimeout(() => {
      let params = '';
      params = filter.t.length > 2 ? `s=${filter.t}&` : '';
      params += filter.type !== '' ? `type=${filter.type}&` : '';
      params += `page=${totalQantity}&`;
      params += `r=json&`;

      axios
        .get(`https://www.omdbapi.com/?${params}apikey=${apiKey}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => reject(err.response.data));
    }, 500);
  });
};

export const requestMovieDescription = movieId => {
  return new Promise((resolve, reject) => {
    let params = `i=${movieId}&`;
    axios
      .get(`https://www.omdbapi.com/?${params}apikey=${apiKey}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err.response.data));
  });
};
