class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialUserCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }


  createNewCard(data) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.cardName,
        link: data.cardLink,
      }),
    }).then(res => this._getResponseData(res));
  }

  setLikes(idCard, isLiked) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes/`, {
      method: isLiked? "PUT" : "DELETE",
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }



  deleteCards(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/`, {
      method: "DELETE",
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  getInitialUserInfo() {
    return fetch(`${this._baseUrl}/users/me/`, {
      headers: this._headers,
    }).then(res => this._getResponseData(res));
  }

  editlUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(res => this._getResponseData(res));
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarLink
      })
    }).then(res => this._getResponseData(res));
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'de757743-a43f-41c7-85c7-5187f80aa0ab',
    'Content-Type': 'application/json'
  }
});

export default api