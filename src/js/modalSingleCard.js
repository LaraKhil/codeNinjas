import filmApiService from './api-service';
import renderModalWindow from '../Templates/modalTemplate.hbs';
import {refs} from '../js/cartset';

const modalRefs = {
    modalHbsRef: document.querySelector('.modal__hbs-wrapper'),
    btnModalClose: document.querySelector('.js-modal__btn-close'),
    modalMode: document.querySelector('.modal')

};

function onFilmClick(e){
  const targetId = e.target.id;
  filmApiService.fetchFilmsById(targetId)
  .then(data => {
    const renderModal = renderModalWindow(data);
    modalRefs.modalHbsRef.innerHTML = renderModal;
    modalRefs.modalMode.classList.remove('show');
  });
};

function onBtnModalClose(){
  modalRefs.modalMode.classList.add('show');
}

refs.addEventListener('click', onFilmClick);
modalRefs.btnModalClose.addEventListener('click', onBtnModalClose);

