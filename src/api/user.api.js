import api from './api.js';

class UserService {
  getAvatar(id) {
    return api.httpGETAvatar('/api/auth/getAvatar/' + id);
  }

  editUser(userEditRequest) {
    return api.httpPUT('/api/auth/editUser/', userEditRequest);
  }

  editUserPassword(editUserPasswordRequest) {
    return api.httpPATCH('/api/auth/changePassword', editUserPasswordRequest);
  }

  getCurrentUserAvatar() {
    return api.httpGETAvatar('/api/auth/getCurrentUserAvatar');
  }

  saveAvatar(fd) {
    return api.httpPOST('/api/auth/editAvatar', fd);
  }

  deleteAvatar() {
    return api.httpDELETE('/api/auth/deleteAvatar');
  }
}

const userService = new UserService();
export default userService;