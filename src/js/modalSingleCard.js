import { filmApiService } from './api-service';
import renderModalWindow from '../Templates/modalTemplate.hbs';
import { refs } from '../js/cartset';
import modalBtnService from './modal-btn';
import emptyPoster from '../images/plug.png';
//---conecting-lightbox---
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

//---conecting-lightbox---

const modalList = document.querySelector('.modal');
const modalHBS = document.querySelector('.modal__hbs-wrapper');

function onFilmClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  const targetId = e.target.id;

  document.addEventListener('keydown', e => {
    const keyEsc = e.key === 'Escape';
    if (keyEsc) {
      modalList.classList.add('show');
    }
  });

  filmApiService
    .fetchFilmsById(targetId)
    .then(data => {
      const fullPath = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      const poster = data.poster_path ? fullPath : emptyPoster;
      return {
        ...data,
        poster,
      };
    })
    .then(data => {
      if (data.status === 'Released') {
        const renderModal = renderModalWindow(data);
        modalHBS.innerHTML = renderModal;

        const liItem = e.target.closest('li');
        const modalRefs = {
          modalImg: liItem.querySelector('.hero-list__img'),
          modalBtnClose: document.querySelector('.js-modal__btn-close'),
          modalCloseBlur: document.querySelector('.modal__wrapper'),
          modalGenreHtml: document.querySelector('.js-modal-genre'),
        };
        const { modalBtnClose, modalCloseBlur, modalImg, modalGenreHtml } = modalRefs;

        const modalGenres = modalImg.dataset.genres;
        modalGenreHtml.innerHTML = modalGenres;

        modalList.classList.remove('show', 'scale');
        //---TRAILER-BUTTON-START---

        console.log(data.videos);
        const openTrailer = () => {
          const instance = basicLightbox.create(
            `<iframe src="https://www.youtube.com/embed/${data.videos.results[0].key}" width="560" height="315" frameborder="0"></iframe>`,
          );
          instance.show();
        };

        if (data.videos !== null && data.videos.results[0].site === 'YouTube') {
          const trailerContainer = modalList.querySelector('.modal__trailer_container');
          const trailerButton = modalList.querySelector('.modal__trailer_button');

          trailerContainer.classList.remove('is-hidden');
          trailerButton.addEventListener('click', openTrailer);
        }

        //---TRAILER-BUTTON-END---
        function onModalClose(e) {
          if (e.target === e.currentTarget) {
            modalList.classList.add('show', 'scale');
          }
        }

        modalBtnClose.addEventListener('click', onModalClose);
        modalCloseBlur.addEventListener('click', onModalClose);

        modalBtnService.updateBtns(targetId);
        modalBtnService.refs.queueBtn.addEventListener('click', () =>
          onAddBtnClick(modalBtnService.localStorageKeys.queueFilm),
        );
        modalBtnService.refs.watchBtn.addEventListener('click', () =>
          onAddBtnClick(modalBtnService.localStorageKeys.watchedFilm),
        );
        function onAddBtnClick(key) {
          modalBtnService.save(key);
        }
      }
    });
}

refs.addEventListener('click', onFilmClick);
