const Refs = {
  homeHeader: document.querySelector('#header-menu-home'),
  libreryHeader: document.querySelector('#header-menu-librery'),
  headerStyle: document.querySelector('#btn-librery'),
  form: document.querySelector('.header__search'),
  headerStyleLibrery: document.querySelector('#header'),
  activeLinckHome: document.querySelector('#header-menu-home'),
  activeLinckLibrery: document.querySelector('#header-menu-librery'),
};

function onHomeHeaderBtn(e) {
  e.preventDefault();
  Refs.headerStyle.classList.add('is-hidden');
  Refs.form.classList.remove('is-hidden');
  Refs.headerStyleLibrery.classList.remove('librery');
  Refs.activeLinckHome.classList.add('header__link-home');
  Refs.activeLinckLibrery.classList.remove('header__link-home');
}
function onLibreryHeaderBtn(e) {
  e.preventDefault();
  Refs.headerStyle.classList.remove('is-hidden');
  Refs.form.classList.add('is-hidden');
  Refs.headerStyleLibrery.classList.add('librery');
  Refs.activeLinckLibrery.classList.add('header__link-home');
  Refs.activeLinckHome.classList.remove('header__link-home');
}

Refs.homeHeader.addEventListener('click', onHomeHeaderBtn);
Refs.libreryHeader.addEventListener('click', onLibreryHeaderBtn);
