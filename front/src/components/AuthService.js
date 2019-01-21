import decode from 'jwt-decode';

const configuration = process.env.NODE_ENV === 'production'
  ? require('../config/prod.json')
  : require('../config/dev.json');

class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain
      || `${configuration.API.URL}:${configuration.API.PORT}`; // API server domain
  }

  login = async (username, password) => {
    // Get a token from api server using the fetch api
    const res = await this.fetch(`${this.domain}/auth`, {
      method: 'POST',
      body: JSON.stringify({
        email: username,
        password,
      }),
    });
    this.setToken(res.token); // Setting the token in localStorage
    return Promise.resolve(res);
  }

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from local storage
    return !!token && !this.isTokenExpired(token); // Hand-waving here
  }

  isTokenExpired = (token) => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  setToken = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  // Retrieves the user token from localStorage
  getToken = () => localStorage.getItem('id_token')


  logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }

  getProfile = () => decode(this.getToken());

  fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers.Authorization = `Bearer ${this.getToken()}`;
    }

    return fetch(url, {
      headers,
      ...options,
    })
      .then(this.checkStatus)
      .then(response => response.json());
  }

  checkStatus = (response) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

const Auth = new AuthService();
export default Auth;
