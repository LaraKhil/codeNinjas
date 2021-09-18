const fCloseBtn = document.querySelector('#f__close-btn');
const fModal = document.querySelector('.fmodal');
const fLink = document.querySelector('.footer__link');

function onFCloseBtn(){
    fModal.classList.add("is-hidden");
}

fCloseBtn.addEventListener('click', onFCloseBtn);

fLink.addEventListener('click', () => {
    if (fModal.classList.contains("is-hidden")){
        fModal.classList.remove("is-hidden"); 
    }
    
});

function onFModalClose(e){
    if(e.target === e.currentTarget){
        onFCloseBtn();
    }
}

fModal.addEventListener('click', onFModalClose)