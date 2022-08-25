class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`)
    }
    return res.json()
  }
 
  saveFilm(film) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: film.country,
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        image: `https://api.nomoreparties.co${film.image.url}`,
        trailerLink: film.trailerLink,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
        thumbnail: `https://api.nomoreparties.co${film.image.formats.thumbnail.url}`,
        movieId: film.id,
      })
    })
    .then((res) => this._checkResponse(res))
  }

  getFilms() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res))
  }

  deleteFilm(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers:this._headers,
      
    })
    .then((res) => this._checkResponse(res))
  }

  editProfile(email, name) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email: email, 
        name: name
      })
    })
    .then((res) => this._checkResponse(res))
      
  }
  
}

export const mainApi = new MainApi ({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});