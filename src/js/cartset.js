import filmApiService from './api-service';
import renderPopularFilms from '../Templates/heroCartset.hbs';
import emptyPoster from '../images/plug.png'
import { normalData } from './api-service';

export const refs = document.querySelector('.hero-list');

const refList = document.querySelector('.hero-list');

export function apiRenderFirstPage(){
  filmApiService
    .fetchAPIGenres()
    .then(data => (filmApiService.genres = data.genres))
    .then(() => filmApiService.fetchPopularFilms())
    .then(({ results }) => normalData(results, refList, renderPopularFilms, emptyPoster));
};

apiRenderFirstPage();

