import filmApiService from './api-service';
import renderModalWindow from '../Templates/modalTemplate.hbs';
import {refs} from '../js/cartset';


const modalList = document.querySelector('.modal');
const modalHBS = document.querySelector('.modal__hbs-wrapper');

function onFilmClick(e){
  const targetId = e.target.id;
  filmApiService.fetchFilmsById(targetId)
  .then(data => {
    
    const renderModal = renderModalWindow(data);
    modalHBS.innerHTML = renderModal;

    const modalRefs = {
      modalBtnClose: document.querySelector('.js-modal__btn-close'),
    
    };
    modalList.classList.remove('show');

    function onBtnModalClose() {
      modalList.classList.add('show');
    }

    modalRefs.modalBtnClose.addEventListener('click', onBtnModalClose);
  });

  
};

refs.addEventListener('click', onFilmClick);
