import { apiURL } from './utils.js';

class Auth {
  /**
   * Creates an instance of Api.
   * @param {obj} data auth data
   * @param {string} url Api path
   * @memberof Api
   */
  constructor(url) {
    this._baseURL = url;
  }

  getUserData() {
    return this._sendRequest('GET', `${this._baseURL}/users/me`, {
      'Content-Type': 'application/json',
    }).then((res) => this._handleResponseStatus(res));
  }

  registerUser(password, email) {
    return this._sendRequest(
      'POST',
      `${this._baseURL}/signup`,
      { 'Content-Type': 'application/json' },
      { password, email },
    ).then((res) => this._handleResponseStatus(res));
  }

  loginUser(password, email) {
    return this._sendRequest(
      'POST',
      `${this._baseURL}/signin`,
      { 'Content-Type': 'application/json' },
      { password, email },
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
const auth = new Auth(apiURL);
export default auth;
