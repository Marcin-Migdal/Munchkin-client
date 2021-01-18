import api from './api.js';

class PlayerStatusService {
  leaveRoom(roomId) {
    return api.httpPATCH('/api/playerStatus/exitRoom/' + roomId);
  }
}

const playerStatusService = new PlayerStatusService();
export default playerStatusService;