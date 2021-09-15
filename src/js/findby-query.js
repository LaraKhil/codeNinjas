import filmApiService from './api-service';
import renderFilms from '../Templates/heroCartset.hbs';
import { debounce } from 'lodash';

const refsError = document.querySelector('#error-form');
const refList = document.querySelector('.hero-list');

const refsInput = document.querySelector('#header-input');
refsInput.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  const input = e.target.value;
  refsError.classList.add('is-hidden');
  if (input === '') {
    return;
  }
  filmApiService.fetchFilmsByQuery(input).then(({ results }) => {
    if (results.length === 0) {
      refsError.classList.remove('is-hidden');
      return;
    }

    refList.innerHTML = '';
    const render = renderFilms(results);
    // console.log(results);

    refList.insertAdjacentHTML('afterbegin', render);
  });
}
