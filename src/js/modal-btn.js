const modalBtnService = {
  localStorageKeys: {
    queueFilm: { name: 'queueList', exist: false, textContent: 'QUEUE' },
    watchedFilm: { name: 'watchedList', exist: false, textContent: 'WATCHED' },
  },

  filmId: undefined,
  refs: {
    modal: document.querySelector('.modal'),
    watchBtn: document.querySelector('[data-action="addWatch"]'),
    queueBtn: document.querySelector('[data-action="addQueue"]'),
  },

  /**
   * Обновляет ссылки на кнопки
   */
  updateBtns(id) {
    this.resetKeysExist();
    this.filmId = id;
    this.refs.modal = document.querySelector('.modal');
    this.refs.watchBtn = document.querySelector('[data-action="addWatch"]');
    this.refs.queueBtn = document.querySelector('[data-action="addQueue"]');
    ////////////////
    this.updateExistOnLoad(this.localStorageKeys.watchedFilm);
    this.updateExistOnLoad(this.localStorageKeys.queueFilm);
    ///////////////
  },
  /**
   * Обновляет текстовый контент кнопки
   */
  updateModalBtnContent(key) {
    let btn;
    if (key === this.localStorageKeys.queueFilm) {
      btn = this.refs.queueBtn;
    } else if (key === this.localStorageKeys.watchedFilm) {
      btn = this.refs.watchBtn;
    }
    // console.log(key.textContent);
    key.exist
      ? (btn.textContent = `DELETE FROM ${key.textContent}`)
      : (btn.textContent = `ADD TO ${key.textContent}`);
  },
  /**
   * Проверяет наличие id в localStorage
   */
  updateExistOnLoad(key) {
    let keyDataExist = this.load(key.name);
    if (keyDataExist) {
      if (this.checkExistingId(this.filmId, keyDataExist) > -1) {
        key.exist = true;
        this.updateModalBtnContent(key);
      }
    }
  },
  /**
   * Сохраняет в localStorage данные фильма по переданному ключу
   */
  save(key) {
    try {
      let arr = [];
      let data = this.load(key.name);
      if (data) {
        arr = [...data];
      }
      if (key.exist) {
        arr = this.removeFilm(this.filmId, arr);
      } else {
        const filmObj = this.getfilmData();
        arr.push(filmObj);
      }

      const serializedState = JSON.stringify(arr);

      localStorage.setItem(key.name, serializedState);
      key.exist = !key.exist;
      this.updateModalBtnContent(key);
    } catch (err) {
      console.error('error: ', err);
    }
  },
  resetKeysExist() {
    this.localStorageKeys.queueFilm.exist = false;
    this.localStorageKeys.watchedFilm.exist = false;
  },
  /**
   * парсит коллекцию фильмов из localStorage по ключу key (queueList/watchList)
   */
  load(key) {
    try {
      const serializedState = localStorage.getItem(key);

      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  },
  /**
   * Получает данные фильма в формате {
   * id:,
   * poster:,
   * title:,
   * genres:,
   * release_date:,
   * rating:,
   *
   * }
   */
  getfilmData() {
    const modal = this.refs.modal;

    const filmData = {
      id: this.filmId,
      poster: modal.querySelector('.modal__img').getAttribute('src'),
      title: modal.querySelector('.modal__title').textContent,
      genres: 'Genre1, Genre2',
      release_date: 'release_date',
      // genres: modal.querySelector('[data-description="genres"]').textContent,
      // genres: modal.querySelector('[data-description="genres"]').textContent,
      // releaseYear: modal.querySelector('data-description="release"').textContent,
      //      rating: modal.querySelector('.modal__rating').textContent,
    };
    return filmData;
  },

  /**
   * проверка на наличие фильма в массиве array по переданному id
   * @return index
   */
  checkExistingId(id, array) {
    let foundIndex = array.findIndex(item => item.id === id);

    return foundIndex;
  },
  /**
   * удаляет фильм из массива array по переданному id
   * возвращает новый массив
   */
  removeFilm(id, array) {
    let index = this.checkExistingId(id, array);
    if (index !== -1) {
      //newarr =  array.filter(item=> item.id !== id })
      let newArray = [...array];
      newArray.splice(index, 1);
      return newArray;
    }
  },
};
export default modalBtnService;

// localStorage.clear();
// console.log(modalBtn.refs.watchBtn);
// modalBtn.refs.queueBtn.addEventListener('click', () => {
//   modalBtn.save('queueList');
// });
// modalBtn.refs.watchBtn.addEventListener('click', () => {
//   modalBtn.save('watchedList');
// });
