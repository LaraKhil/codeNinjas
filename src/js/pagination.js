import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

import filmApiService from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';

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
      const render = renderPopularFilms(normalData);
      refList.innerHTML = render;
    });

  options.totalItems;

  // if (currentPage === 10) {
  //     return false;
  //     // return true;
  // }
});
