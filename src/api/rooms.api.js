import api from './api.js';

class RoomsService {
  getPageableRooms(url) {
    return api.httpGET('/api/rooms' + url);
  }

  getRoom(roomId){
    return api.httpGET('/api/rooms/getRoom/' + roomId)
  }

  getSearchedRooms(searchInput){
    return api.httpGET('/api/rooms/search/' + searchInput)
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