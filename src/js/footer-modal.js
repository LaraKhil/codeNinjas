const fCloseBtn = document.querySelector('#f__close-btn');
const fModal = document.querySelector('.fmodal');
const fLink = document.querySelector('.footer__link');

console.log(fCloseBtn);
console.log(fModal);
console.log(fLink);

// fCloseBtn.addEventListener('click', fModalFunc(remove));
// fLink.addEventListener('click', fModalFunc(add));

// function fModalFunc(test) {
//     fModal.classList.test("is-hidden")
//     console.log("test")
// }

fCloseBtn.addEventListener('click', () => {
    fModal.classList.add("is-hidden");
});

fLink.addEventListener('click', () => {
    if (fModal.classList.contains("is-hidden"))
    fModal.classList.remove("is-hidden");
});