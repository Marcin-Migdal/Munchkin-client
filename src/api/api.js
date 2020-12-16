import axios from 'axios';
import jwt_decode from 'jwt-decode';
export const backendUrl = 'http://192.168.0.110:5000';

class ApiService {
  httpGET(url) {
    if (this.validateToken()) {
      return axios.get(backendUrl + url, this.authorize())
        .then(this.mapResponse);
    } else {
      window.location.reload(false);
      
    }
  }

  httpPOST(url, data = {}) {
    return axios.post(backendUrl + url, data, this.authorize())
      .then(this.mapResponse);
  }

  httpDELETE(url) {
    return axios.delete(backendUrl + url, this.authorize())
      .then(this.mapResponse);
  }

  httpPUT(url, data = {}) {
    return axios.put(backendUrl + url, data, this.authorize())
      .then(this.mapResponse);
  }

  httpPATCH(url, data = {}) {
    return axios.patch(backendUrl + url, data, this.authorize())
      .then(this.mapResponse);
  }

  mapResponse = (response) => response.data

  authorize = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      return { headers: { Authorization: 'Bearer ' + token } };
    }
    return null;
  }

  validateToken = () => {
    const decodedToken = jwt_decode(localStorage.getItem('token'))
    const currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
      localStorage.removeItem('token')
      return false;
    } else {
      console.log("Valid token");
      return true;
    }
  }
}

const api = new ApiService();
export default api;
