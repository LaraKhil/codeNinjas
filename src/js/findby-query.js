import { filmApiService } from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';
import { debounce } from 'lodash';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { fetchRenderWithPagination, backToTop } from './pagination';
// import backToTop from './pagination'

import { normalData } from './api-service';
import emptyPoster from '../images/plug.png';

import { apiRenderFirstPage } from './cartset';

const refsError = document.querySelector('#error-form');
const refList = document.querySelector('.hero-list');

const refsInput = document.querySelector('#header-input');
const refsPagination = document.querySelector('#pagination');
const refsLoader = document.querySelector('.js-loader');


refsInput.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  const input = e.target.value;
  refsError.classList.add('is-hidden');
  if (input === '') {

    refsPagination.classList.add('is-hidden');
    refsLoader.classList.remove('is-hidden');
    refList.innerHTML = "";
    setTimeout(apiRenderFirstPage, 500);
    setTimeout(fetchRenderWithPagination, 550);
    return;


  }

  filmApiService.fetchFilmsByQuery(input).then(({ results, total_results }) => {
    if (results.length === 0) {
      refsError.classList.remove('is-hidden');
      return;
    }
    refsPagination.classList.remove('is-hidden');
    const options = {
      totalItems: total_results,
      itemsPerPage: 20,
      visiblePages: 5,
      page: 1,
      centerAlign: true,
    };
    normalData(results, refList, renderPopularFilms, emptyPoster);
    if (total_results <= 20) {
      refsPagination.classList.add('is-hidden');
    }
    const pagination = new Pagination('pagination', options);

    pagination.on('beforeMove', event => {
      const currentPage = event.page;
      // console.log(currentPage);
      filmApiService
        .fetchFilmsByQuery(input, currentPage)
        .then(({ results }) => normalData(results, refList, renderPopularFilms, emptyPoster));
      backToTop();
    });

    // normalData(results, refList, renderPopularFilms, emptyPoster);
  });
}