class MainApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then(error => {
        return Promise.reject(error.message);
      });
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  register(name, email, password) {
    return this._request(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
  }

  login(email, password) {
    return this._request(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
  }

  checkToken(jwt) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
      }
    })
  }

  saveMovie(
    jwt,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    ) {
    return this._request(`${this.baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailerLink: trailerLink,
        thumbnail: thumbnail,
        movieId: movieId,
        nameRU: nameRU,
        nameEN: nameEN,
      })
    })
  }

  getSavedMovies(jwt) {
    return this._request(`${this.baseUrl}/movies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
      }
    })
  }

  deleteSavedMovie(jwt, movie_id) {
    return this._request(`${this.baseUrl}/movies/${movie_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwt}`,
      }
    })
  }
}

export const mainApi = new MainApi('http://api.movie.nikita.nomoredomains.monster');