import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import filmApiService from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';

import emptyPoster from '../images/plug.png'
import { normalData } from './api-service';

const refList = document.querySelector('.hero-list');
const refsPagination = document.querySelector('#pagination');


refsPagination.classList.remove('is-hidden');

function fetchRenderWithPagination() {
  filmApiService.fetchPopularFilms().then(data => {
  const options = {
    totalItems: data.total_results,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
  };

  const pagination = new Pagination('pagination', options);

  pagination.on('beforeMove', event => {
    const currentPage = event.page;
    filmApiService
      .fetchPopularFilms(currentPage)
      .then(({ results }) => normalData(results, refList, renderPopularFilms, emptyPoster));
    backToTop();
  });
});
}
// fetchRenderWithPagination();

function backToTop() {
    window.scrollTo(pageXOffset, 0);
  }

export { fetchRenderWithPagination, backToTop };
// export default backToTop;
