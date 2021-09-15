import filmApiService from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';
import { debounce } from 'lodash';
import { normalData } from './api-service';
import emptyPoster from '../images/plug.png'

// const debounce = require('lodash.debounce');

const refsError = document.querySelector('#error-form');
const refList = document.querySelector('.hero-list');
// console.log(filmApiService.fetchFilmsByQuery());

const refsInput = document.querySelector('#header-input');
refsInput.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  const input = e.target.value;
  //   console.log(input);
  filmApiService.fetchFilmsByQuery(input).then(({ results }) => {
    if (!results.title) {
      refsError.classList.add('error');
      refsError.classList.remove('is-hidden');
    }
    normalData(results, refList, renderPopularFilms, emptyPoster);

    // const render = renderFilms(results);
    // // console.log(results);
    // refList.innerHTML = '';
    // refList.insertAdjacentHTML('afterbegin', render);
  });
}
