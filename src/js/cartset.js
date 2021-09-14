import filmApiService from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';
import plug from '../images/plug.png'

const refList = document.querySelector('.hero-list');

filmApiService.fetchAPIGenres()
  .then(data =>filmApiService.genres = data.genres)
  .then(() => filmApiService.fetchPopularFilms())
  .then(({ results }) => {
    const normalData = results.map(movie => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      const fullPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      const poster = movie.poster_path ? fullPath : plug;
      return {
        ...movie,
        release_date: releaseYear,
        poster_path: poster,
        genres: filmApiService.genres
          .filter(obj => movie.genre_ids.includes(obj.id))
          .map(genre => genre.name)
          .slice(0, 3)
          .join(', '),
      };
    });
    const render = renderPopularFilms(normalData);
    refList.innerHTML = render;
  });
console.log(filmApiService.genres);