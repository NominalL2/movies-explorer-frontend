class MoviesApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getCards() {
    return fetch(this.baseUrl, {
      method: 'GET',
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
}

export const movieApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');