class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _checkResponse(res) {
    if (!res.ok) {
      console.log('res', res)
      //return Promise.reject(`Error: ${res.status}`)
      return res.json().then((data) => {
        console.log('data.message', data.message)
        throw new Error(data.message);
        
      });
    }
    return res.json()
  }
 
  saveFilm(film) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: film.country || 'Нет данных',
        director: film.director || 'Нет данных',
        duration: film.duration || 0,
        year: film.year || 'Нет данных',
        description: film.description,
        image: `https://api.nomoreparties.co${film.image.url}`,
        trailerLink: film.trailerLink || 'https://www.youtube.com',
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
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    'Content-Type': 'application/json'
  }
});