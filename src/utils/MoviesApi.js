class MoviesApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`)
    }
    return res.json()
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res))
  }
}

export const moviesApi = new MoviesApi ({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
});