class ApiAuth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((data) => {
      throw new Error(data.message);
    });
  }

  register(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
    }).then((res) => this._checkResponse(res));
  }

  login(password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      
    }).then((res) => this._checkResponse(res));
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res));
  }

  
}

export const apiAuth = new ApiAuth ({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});
