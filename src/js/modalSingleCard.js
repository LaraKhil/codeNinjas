import filmApiService from './api-service';
import renderModalWindow from '../Templates/modalTemplate.hbs';
import { refs } from '../js/cartset';
import modalBtnService from './modal-btn';

const modalList = document.querySelector('.modal');
const modalHBS = document.querySelector('.modal__hbs-wrapper');


function onFilmClick(e) {
  const targetId = e.target.id;
  console.log(e);
  document.addEventListener('keydown', (e) => {
    const keyEsc = e.key === 'Escape';
    if (keyEsc) {
      modalList.classList.add('show');
    }
  });
  
  if (e.target !== e.currentTarget){
    
    filmApiService.fetchFilmsById(targetId)
    .then(data => {
      console.log(data.poster)
      if (data.status === 'Released'){
        const renderModal = renderModalWindow(data);
        modalHBS.innerHTML = renderModal;
        const liItem = e.target.closest('li');
        const modalRefs = {
          modalBtnClose: document.querySelector('.js-modal__btn-close'),
          modalCloseBlur: document.querySelector('.modal__wrapper'),
          modalImg: liItem.querySelector('.hero-list__img'),
          modalGenreHtml: document.querySelector('.js-modal-genre')
        };
        const { modalBtnClose, modalCloseBlur, modalImg, modalGenreHtml } = modalRefs;
  
        const modalGenres = modalImg.dataset.genres;
        modalGenreHtml.innerHTML = modalGenres;
        
        modalList.classList.remove('show', 'scale');
        
        function onModalClose(e) {
          if(e.target === e.currentTarget){
            modalList.classList.add('show', 'scale');
          };
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
        };
      };
      });
  }
  
};

refs.addEventListener('click', onFilmClick);
