import axios from 'axios';

// Esta sería mi llave privada, la cual en otras situaciones debería ser protegida de estar en repositorios públicos
const apiKey = 'e894d40';
const totalQantity = '100';

export const requestMovies = filter => {
  return new Promise((resolve, reject) => {
    if (filter.t.length < 3) {
      return;
    }

    setTimeout(() => {
      let params = '';
      params = filter.t.length > 2 ? `s=${filter.t}&` : '';
      params += filter.type !== '' ? `type=${filter.type}&` : '';
      params += `pages=${totalQantity}&`;
      params += `r=json&`;

      axios
        .get(`http://www.omdbapi.com/?${params}apikey=${apiKey}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => reject(err.response.data));
    }, 500);
  });
};
