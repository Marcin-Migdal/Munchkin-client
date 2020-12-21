import axios from 'axios';

export const backendUrl = 'http://localhost:5000';

class ApiService {
  httpGET(url) {
    return axios.get(backendUrl + url, this.authorize())
      .then(this.mapResponse);
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

  httpPATCH(url, data = {}){
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
}

const api = new ApiService();
export default api;
