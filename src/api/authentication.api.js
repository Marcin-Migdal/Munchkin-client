import api from './api';

class Authentication {
  signIn(request) {
    return api.httpPOST('/api/auth/signin', request)
      .then(this.saveToken);
  }

  signUp(request) {
    return api.httpPOST('/api/auth/signup', request);
  }

  signOut() {
    localStorage.removeItem('token');
    window.location.reload(false);
  }

  saveToken = (response) => {
    const token = response.accessToken;
    localStorage.setItem('token', JSON.stringify(token));
    return response.accessToken;
  }
}

const authenticationService = new Authentication();
export default authenticationService;
