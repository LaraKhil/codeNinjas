import filmApiService from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';

export const refs = document.querySelector('.hero-list');

const refList = document.querySelector('.hero-list');

filmApiService
  .fetchAPIGenres()
  .then(data => (filmApiService.genres = data.genres))
  .then(() => filmApiService.fetchPopularFilms())
  .then(({ results }) => {
    const normalData = results.map(movie => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      return {
        ...movie,
        release_date: releaseYear,
        genres: filmApiService.genres
          .filter(obj => movie.genre_ids.includes(obj.id))
          .map(genre => genre.name)
          .slice(0, 3)
          .join(', '),
      };
    });

    console.log(normalData)
    const render = renderPopularFilms(normalData);
    refList.innerHTML = render;
  });

