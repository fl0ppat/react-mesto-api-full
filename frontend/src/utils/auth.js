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

  getUserData(token) {
    return this._sendRequest("GET", `${this._baseURL}/users/me`, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }).then((res) => this._handleResponseStatus(res));
  }

  registerUser(password, email) {
    return this._sendRequest(
      "POST",
      `${this._baseURL}/signup`,
      { "Content-Type": "application/json" },
      { password: password, email: email }
    ).then((res) => this._handleResponseStatus(res));
  }

  loginUser(password, email) {
    return this._sendRequest(
      "POST",
      `${this._baseURL}/signin`,
      //"https://run.mocky.io/v3/a77cdda3-9ad6-4ccd-b36a-3ff4c4e1f4e7",
      { "Content-Type": "application/json" },
      { password: password, email: email }
    ).then((res) => this._handleResponseStatus(res));
  }

  _handleResponseStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      console.error(`Ошибка: ${res.errors}`);

      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _objectIsEmptyOrUndefined(obj) {
    if (obj === "undefined") {
      return true;
    } else {
      return obj && Object.keys(obj).length === 0;
    }
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
    const reqHeader = {};

    if (headers && !this._objectIsEmptyOrUndefined(headers)) {
      Object.assign(reqHeader, headers);
    }

    const fetchData = {
      method: method,
      headers: reqHeader,
    };

    if (body && !this._objectIsEmptyOrUndefined(body)) {
      fetchData.body = JSON.stringify(body);
    }
    return fetch(url, fetchData);
  }
}
const auth = new Auth("https://auth.nomoreparties.co");
export default auth;
