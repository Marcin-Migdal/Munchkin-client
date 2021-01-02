import api from './api.js';

class UserService {
  getAvatar(id) {
    return api.httpGETAvatar('/api/auth/getAvatar/'+ id);
  }

  getCurrentUserAvatar() {
    return api.httpGETAvatar('/api/auth/getCurrentUserAvatar');
  }

  saveAvatar(fd) {
    return api.httpPOST('/api/auth/editAvatar', fd);
  }
}

const userService = new UserService();
export default userService;