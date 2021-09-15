// import './js/three.min';
// import './js/vanta.net.min';
var setVanta = () => {
  if (window.VANTA)
    window.VANTA.FOG({
      el: '#qwer',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      highlightColor: 0xfad46c,
      midtoneColor: 0xfc8770,
      lowlightColor: 0x3913f2,
      zoom: 3,
    });
};
setVanta();





// import './js/bg'
import './js/pagination';
import './sass/main.scss';


import Pagination from 'tui-pagination';
import './js/modalSingleCard';

// Examples for Pagination

// const container = document.getElementById('tui-pagination-container');
// const instance = new Pagination(container, { ... });

// instance.getCurrentPage();

import './js/cartset';
import './js/findby-query';

import './js/header';

// import './js/modal-btn';


// import './js/pagination';


// import filmApiService from './js/api-service.js';

// console.log(filmApiService.fetchPopularFilms());

// filmApiService.fetchPopularFilms().then(data => console.log(data));
