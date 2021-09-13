import filmApiService from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';

// console.log(filmApiService);
const refList = document.querySelector('.hero-list');

filmApiService.fetchPopularFilms().then(data => {
  console.log(data);
  const test = renderPopularFilms(data);
  refList.innerHTML = test;
});
