import { apiURL } from './utils.js';

class Api {
  /**
   * Creates an instance of Api.
   * @param {obj} data auth data
   * @param {string} url Api path
   * @memberof Api
   */
  constructor(url) {
    this.deleteCard = this.deleteCard.bind(this);
    this._baseURL = url;
    this.token = '';
  }

  setToken(token) {
    this.token = token;
  }

  getInitialCards() {
    return this._sendRequest('GET', `${this._baseURL}/cards`).then((res) => this._handleResponseStatus(res));
  }

  getUserData() {
    return this._sendRequest('GET', `${this._baseURL}/users/me`).then((res) => this._handleResponseStatus(res));
  }

  editProfileData(name, about) {
    return this._sendRequest(
      'PATCH',
      `${this._baseURL}/users/me`,
      { 'Content-Type': 'application/json' },
      { name, about },
    ).then((res) => this._handleResponseStatus(res));
  }

  addNewCard(name, link) {
    return this._sendRequest(
      'POST',
      `${this._baseURL}/cards`,
      { 'Content-Type': 'application/json' },
      { name, link },
    ).then((res) => this._handleResponseStatus(res));
  }

  deleteCard(id) {
    return this._sendRequest('DELETE', `${this._baseURL}/cards/${id}`).then((res) => this._handleResponseStatus(res));
  }

  sendLike(id) {
    return this._sendRequest('PUT', `${this._baseURL}/cards/${id}/likes`).then((res) => this._handleResponseStatus(res));
  }

  delLike(id) {
    return this._sendRequest('DELETE', `${this._baseURL}/cards/${id}/likes`).then((res) => this._handleResponseStatus(res));
  }

  updateAvatar(link) {
    return this._sendRequest(
      'PATCH',
      `${this._baseURL}/users/me/avatar`,
      { 'Content-Type': 'application/json' },
      { avatar: link },
    ).then((res) => this._handleResponseStatus(res));
  }

  _handleResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    console.error(`Ошибка: ${res.errors}`);

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _objectIsEmptyOrUndefined(obj) {
    if (obj === 'undefined') {
      return true;
    }
    return obj && Object.keys(obj).length === 0;
  }

  /**
   * Send modulable request
   *
   * @param {string} method Sending method (GET, POST, etc.)
   * @param {string} url API URL
   * @param {object} headers key: value representation of headers
   * @param {object} body key: vlaue representation of body
   * @return {Promise}
   * @memberof Api
   */
  _sendRequest(method, url, headers, body) {
    const reqHeader = {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (headers && !this._objectIsEmptyOrUndefined(headers)) {
      Object.assign(reqHeader, headers);
    }

    const fetchData = {
      method,
      headers: reqHeader,
      credentials: 'include',
    };

    if (body && !this._objectIsEmptyOrUndefined(body)) {
      fetchData.body = JSON.stringify(body);
    }
    return fetch(url, fetchData);
  }
}
const api = new Api(apiURL);
export default api;
