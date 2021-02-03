import api from './api.js';

class PlayerStatusService {
  getAllPlayersStatusesInRoom(roomId) {
    return api.httpGET('/api/playerStatus/allPlayersStatusesInRoom/' + roomId)
  }

  getAllSortedPlayersStatusesInRoom(roomId) {
    return api.httpGET('/api/playerStatus/getGameSummary/' + roomId)
  }

  leaveRoom(roomId) {
    return api.httpPATCH('/api/playerStatus/exitRoom/' + roomId)
      .catch((e) => console.log(e));
  }

  savePlayerStatus(currentPlayerStatus) {
    return api.httpPUT('/api/playerStatus/setPlayerStatus/', currentPlayerStatus)
  }

  getAllRacesAndClasses() {
    return api.httpGET('/api/playerStatus/getAllRacesAndClasses/')
  }

  savePlayerRace(url, changeRequest) {
    return api.httpPATCH('/api/playerStatus/race/' + url, changeRequest)
  }

  savePlayerClass(url, changeRequest) {
    return api.httpPATCH('/api/playerStatus/class/' + url, changeRequest)
  }

  changeGender(playerStatusId) {
    return api.httpPATCH('/api/playerStatus/changeGender/' + playerStatusId)
  }
}

const playerStatusService = new PlayerStatusService();
export default playerStatusService;