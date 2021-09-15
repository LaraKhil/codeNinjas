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
  filmApiService.fetchFilmsByQuery(input).then(({ results }) => {
    if (!results.title) {
      refsError.classList.add('error');
      refsError.classList.remove('is-hidden');
    }
    normalData(results, refList, renderPopularFilms, emptyPoster)
  });
}
