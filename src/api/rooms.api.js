import api from './api.js';

class RoomsService {
  getPageableRoom(url) {
    return api.httpGET('/api/rooms' + url);
  }

  joinRoom(joinRoomRequest) {
    return api.httpPUT('/api/playerStatus/joinRoom', joinRoomRequest)
  }

  addRoom(addRoomRequest) {
    return api.httpPOST('/api/rooms/addRoom', addRoomRequest)
  }

  editRoom(editRoomRequest) {
    return api.httpPUT('/api/rooms/editRoom', editRoomRequest)
  }

  deleteRoom(roomId){
    return api.httpDELETE('/api/rooms/deleteById/' + roomId)
  }
}

const roomsService = new RoomsService();
export default roomsService;