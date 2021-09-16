import modalBtnService from './modal-btn';
import filmListTmpl from '../Templates/heroCartset.hbs';
import { apiRenderFirstPage } from './cartset';
const Refs = {
  homeHeader: document.querySelector('#header-menu-home'),
  libreryHeader: document.querySelector('#header-menu-librery'),
  headerStyle: document.querySelector('#btn-librery'),
  form: document.querySelector('.header__search'),
  headerStyleLibrery: document.querySelector('#header'),
  activeLinckHome: document.querySelector('#header-menu-home'),
  activeLinckLibrery: document.querySelector('#header-menu-librery'),
};
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
  apiRenderFirstPage();
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
  const renderMarkup = filmListTmpl(data);
  refs.innerHTML = renderMarkup;
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
