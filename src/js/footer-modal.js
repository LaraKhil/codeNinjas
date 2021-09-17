const fCloseBtn = document.querySelector('#f__close-btn');
const fModal = document.querySelector('.fmodal');
const fLink = document.querySelector('.footer__link');

fCloseBtn.addEventListener('click', () => {
    fModal.classList.add("is-hidden");
});

fLink.addEventListener('click', () => {
    if (fModal.classList.contains("is-hidden"))
    fModal.classList.remove("is-hidden");
});