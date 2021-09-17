const filmApiService = {
  id: '',
  genres: [],
  api_key: '28a3a1a55be29248c28e2fe727538aaf',
  base_url: 'https://api.themoviedb.org/3',
  page: 1,
  query: '',
  setQuery(query) {
    this.query = query;
  },
  setPage(page) {
    this.page = page;
  },

  async fetchAPIGenres() {
    const mediaType = 'movie';
    const url = `${this.base_url}/genre/${mediaType}/list?api_key=${this.api_key}&language=en-US`;
    return this.fetchFilm(url);
  },

  async fetchPopularFilms(page = 1) {
    this.setPage(page);
    const mediaType = 'movie';
    const timeWindow = 'day';
    const requestParams = `trending/${mediaType}/${timeWindow}?api_key=${this.api_key}&page=${this.page}`;
    const url = `${this.base_url}/${requestParams}`;
    return this.fetchFilm(url);
  },

  async fetchFilmsByQuery(query, page = 1) {
    this.setQuery(query);
    this.setPage(page);
    const requestParams = `search/movie?api_key=${this.api_key}&query=${this.query}&page=${this.page}`;
    const url = `${this.base_url}/${requestParams}`;
    return await this.fetchFilm(url);
  },

  async fetchFilmsById(id) {
    const requestParams = `/movie/${id}?api_key=${this.api_key}&append_to_response=videos`;
    const url = `${this.base_url}/${requestParams}`;
    return await this.fetchFilm(url);
  },

  async fetchFilm(url) {
    const response = await fetch(url);
    return response.json();
  },
};

export { filmApiService };

export function normalData(data, refs, render, emptyPoster) {
  const normalData = data.map(movie => {
    const releaseDate = new Date(movie.release_date).getFullYear();
    const releaseYear = releaseDate ? releaseDate : '42';
    const fullPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const poster = movie.poster_path ? fullPath : emptyPoster;

    return {
      ...movie,
      release_date: releaseYear,
      poster,
      genres: filmApiService.genres
        .filter(obj => movie.genre_ids.includes(obj.id))
        .map(genre => genre.name)
        .slice(0, 3)
        .join(', '),
    };
  });

  const renderMarkup = render(normalData);
  refs.innerHTML = renderMarkup;
}
