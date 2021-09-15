import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import filmApiService from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';
import emptyPoster from '../images/plug.png';
import { normalData } from './api-service';


const refList = document.querySelector('.hero-list');

const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination('pagination', options);

pagination.on('beforeMove', event => {
  const currentPage = event.page;
  filmApiService
    .fetchAPIGenres()
    .then(data => (filmApiService.genres = data.genres))
    .then(() => filmApiService.fetchPopularFilms(currentPage))
    .then(({ results }) => {
      normalData(results, refList, renderPopularFilms, emptyPoster)
    });

  options.totalItems;

  // if (currentPage === 10) {
  //     return false;
  //     // return true;
  // }
});
