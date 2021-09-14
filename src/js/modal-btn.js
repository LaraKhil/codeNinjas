const modalBtn = {
  refs: {
    modal: document.querySelector('.modal'),
    watchBtn: document.querySelector('[data-action="watch"]'),
    queueBtn: document.querySelector('[data-action="queue"]'),
  },
  save(key) {
    try {
      const value = this.getfilmData();
      let arr = [];
      let data = this.load(key);
      if (data) {
        arr = data;
      }
      arr.push(value);
      const serializedState = JSON.stringify(arr);
      localStorage.setItem(key, serializedState);
      console.log(value);
    } catch (err) {
      console.error('error: ', err);
    }
  },
  load(key) {
    try {
      const serializedState = localStorage.getItem(key);

      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  },
  getfilmData() {
    const modal = this.refs.modal;
    const filmData = {
      img: modal
        .querySelector('.modal__img-container')
        .getElementsByTagName('img')[0]
        .getAttribute('src'),
      title: modal.querySelector('.modal__title').textContent,
      genres: modal.querySelector('[data-description="genres"]').textContent,
      // releaseYear: modal.querySelector('data-description="release"').textContent,
      rating: modal.querySelector('.modal__rating').textContent,
    };
    return filmData;
  },
};

// localStorage.clear();

modalBtn.refs.queueBtn.addEventListener('click', () => {
  modalBtn.save('queueList');
});
modalBtn.refs.watchBtn.addEventListener('click', () => {
  modalBtn.save('watchedList');
});
