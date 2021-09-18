import modalBtnService from './modal-btn';
import filmListTmpl from '../Templates/heroCartset.hbs';
import { apiRenderFirstPage } from './cartset';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { backToTop } from './pagination';
const refsLoader = document.querySelector('.js-loader');
const refList = document.querySelector('.hero-list');
const refsPagination = document.querySelector('#pagination');

const Refs = {
  pagination: document.querySelector('#pagination'),
  homeHeader: document.querySelector('#header-menu-home'),
  libreryHeader: document.querySelector('#header-menu-librery'),
  headerStyle: document.querySelector('#btn-librery'),
  form: document.querySelector('.header__search'),
  headerStyleLibrery: document.querySelector('#header'),
  activeLinckHome: document.querySelector('#header-menu-home'),
  activeLinckLibrery: document.querySelector('#header-menu-librery'),
  defaultDeleteEnter: document.querySelector('#header__search-form'),
};

Refs.defaultDeleteEnter.addEventListener('submit', defaultdelete);
function defaultdelete(e) {
  e.preventDefault();
}

const btnRefs = {
  watchedBtn: document.querySelector('#btn-header-watched'),
  queueBtn: document.querySelector('#btn-header-queue'),
};
function onHomeHeaderBtn(e) {
  e.preventDefault();
  Refs.headerStyle.classList.add('is-hidden');
  Refs.form.classList.remove('is-hidden');
  Refs.headerStyleLibrery.classList.remove('librery');
  Refs.activeLinckHome.classList.add('header__link-home');
  Refs.activeLinckLibrery.classList.remove('header__link-home');
  
  refsPagination.classList.add('is-hidden');
  refsLoader.classList.remove('is-hidden');
  refList.innerHTML = "";
  setTimeout(apiRenderFirstPage, 500);
}
function onLibreryHeaderBtn(e) {
  e.preventDefault();
  Refs.headerStyle.classList.remove('is-hidden');
  Refs.form.classList.add('is-hidden');
  Refs.headerStyleLibrery.classList.add('librery');
  Refs.activeLinckLibrery.classList.add('header__link-home');
  Refs.activeLinckHome.classList.remove('header__link-home');

  /////////render code
  changeBtnClass(modalBtnService.localStorageKeys.watchedFilm.name, btnRefs.watchedBtn);
  //
}

function render(typeFilmList = modalBtnService.localStorageKeys.watchedFilm.name) {
  const refs = document.querySelector('.hero-list');
  let data = modalBtnService.load(typeFilmList);

  ////////////Проверка на наличие массива
  if (!data) {
    data = [];
  }

  Refs.pagination.classList.remove('is-hidden');
  if (data.length <= 20) {
    Refs.pagination.classList.add('is-hidden');
  }
  const options = {
    totalItems: data.length,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
  };

  const pagination = new Pagination('pagination', options);
  //
  let firstFiml = 0;
  let lastFilm = 20;
  const newData = data.slice(firstFiml, lastFilm);
  //
  const renderMarkup = filmListTmpl(newData);
  refs.innerHTML = renderMarkup;

  pagination.on('beforeMove', event => {
    const currentPage = event.page;
    let firstFiml = (currentPage - 1) * 20;
    let lastFilm = firstFiml + 20;

    const newData = data.slice(firstFiml, lastFilm);

    const renderMarkup = filmListTmpl(newData);
    refs.innerHTML = renderMarkup;
    backToTop();
  });
}

btnRefs.queueBtn.addEventListener('click', e => {
  changeBtnClass(modalBtnService.localStorageKeys.queueFilm.name, e.target);
});
btnRefs.watchedBtn.addEventListener('click', e => {
  changeBtnClass(modalBtnService.localStorageKeys.watchedFilm.name, e.target);
});
function changeBtnClass(typeList, btn) {
  btn.disabled = true;
  btn.classList.add('btn--active');

  //////
  render(typeList);

  ///////
  if (btn === btnRefs.watchedBtn) {
    if (btnRefs.queueBtn.classList.contains('btn--active')) {
      btnRefs.queueBtn.classList.remove('btn--active');
    }
    btnRefs.queueBtn.disabled = false;
  } else if (btn === btnRefs.queueBtn) {
    if (btnRefs.watchedBtn.classList.contains('btn--active')) {
      btnRefs.watchedBtn.classList.remove('btn--active');
    }
    btnRefs.watchedBtn.disabled = false;
  }
}

Refs.homeHeader.addEventListener('click', onHomeHeaderBtn);
Refs.libreryHeader.addEventListener('click', onLibreryHeaderBtn);
