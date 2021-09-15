import filmApiService from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';
import { debounce } from 'lodash';

import { normalData } from './api-service';
import emptyPoster from '../images/plug.png';

const refsError = document.querySelector('#error-form');
const refList = document.querySelector('.hero-list');

const refsInput = document.querySelector('#header-input');

refsInput.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  const input = e.target.value;
  refsError.classList.add('is-hidden');
  if (input === '') {
    return filmApiService
      .fetchAPIGenres()
      .then(data => (filmApiService.genres = data.genres))
      .then(() => filmApiService.fetchPopularFilms())
      .then(({ results }) => normalData(results, refList, renderPopularFilms, emptyPoster));
  }

  filmApiService.fetchFilmsByQuery(input).then(({ results }) => {
    if (results.length === 0) {
      refsError.classList.remove('is-hidden');
      return;
    }
    normalData(results, refList, renderPopularFilms, emptyPoster);
  });
}
