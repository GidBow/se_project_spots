class Api {
  constructor(options) {
    // constructor body
    this._baseUrl = "https://around-api.en.tripleten-services.com/v1";
    this._headers = {
      authorization: "d321f5b5-1857-422e-ae16-202feee0f36a",
      "Content-Type": "application/json",
    };
  }

  _generateRequestOptions({ endpoint, method, body = null }) {
    this._endpoint = endpoint;
    this._method = method;
    this._body = body;
  }

  _initializeRequest() {
    return fetch(`${this._baseUrl}${this._endpoint}`, {
      method: this._method,
      headers: this._headers,
      body: this._body ? JSON.stringify(this._body) : null,
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    this._generateRequestOptions({
      endpoint: "/cards",
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  getUserInfo() {
    this._generateRequestOptions({
      endpoint: "/users/me",
      method: "GET",
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  updateUserInfo({ name, about }) {
    this._generateRequestOptions({
      endpoint: "/users/me",
      method: "PATCH",
      body: { name, about },
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  updateUserAvatar({ avatar }) {
    this._generateRequestOptions({
      endpoint: "/users/me/avatar",
      method: "PATCH",
      body: { avatar },
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  addNewCard({ name, link }) {
    console.log({ name, link });
    this._generateRequestOptions({
      endpoint: "/cards",
      method: "POST",
      body: { name, link },
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  deleteCard({ cardId }) {
    this._generateRequestOptions({
      endpoint: `/cards/${cardId}`,
      method: "DELETE",
      body: { cardId },
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  isLiked({ cardId }) {
    this._generateRequestOptions({
      endpoint: `/cards/${cardId}/likes`,
      method: "PUT",
      body: { cardId },
    });
    return this._initializeRequest().then(this._checkResponse);
  }

  removeLike({ cardId }) {
    this._generateRequestOptions({
      endpoint: `/cards/${cardId}/likes`,
      method: "DELETE",
      body: cardId,
    });
    return this._initializeRequest().then(this._checkResponse);
  }
}

export default Api;
