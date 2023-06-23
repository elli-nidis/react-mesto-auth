import { apiConfig } from "./constants";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = {
      authorization: options.headers.authorization,
      'Content-Type': options.headers['Content-Type']
    };
  }

  //проверка ответа сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    //если ошибка, отклоняю промисс
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //запрашиваю на сервере начальные карточки, получаю массив с объектами
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  //запрашиваю на сервере данные пользователя, получаю объект
  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  //меняю данные пользователя на сервере
  patchUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      })
    })
    .then(this._checkResponse);
  }

  //меняю аватар на сервере
  patchAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkResponse);
  }

   //отправляю новую карточку на сервер
   postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._checkResponse);
  }

  // отправляю лайк на сервер
   putLike(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  // удаляю лайк с сервера
  deleteLike(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  // меняю статус лайка
  changeLikeCardStatus(isLiked, idCard) {
    return isLiked ? this.deleteLike(idCard) : this.putLike(idCard);
  }

   // удаляю карточку с сервера
   deleteCard(idCard) {
    return fetch(`${this._baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }
}

//создаю экземпляр класса Api
const api = new Api({
  baseUrl: apiConfig.baseUrl,
  headers: {
    authorization: apiConfig.token,
    'Content-Type': 'application/json'
  }
}); 

export {api};