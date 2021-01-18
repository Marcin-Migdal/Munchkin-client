import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import playerStatusService from '../../api/playerStatus.api';
import ListComponent from '../../components/ListComponent/ListComponent';
import useFetchGet from '../../hooks/useFetchGet';

export default function Game({ classes, mobile }) {
  const location = useLocation();
  const [playerStatuses] = useFetchGet({ url: '/api/playerStatus/allPlayersStatuses/' + location.state.roomId });
  const styles = classes();

  useEffect(() => {
    const leaveRoomOnUnmount = () => {
      playerStatusService.leaveRoom(location.state.roomId)
        .then(() => console.log('Opuszczono pokój'))
        .catch((e) => console.log(e))
    }

    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = '';
    });

    window.addEventListener("unload", () => leaveRoomOnUnmount());

    return () => {
      leaveRoomOnUnmount()
      window.removeEventListener("beforeunload", (event) => {
        event.preventDefault();
        event.returnValue = '';
      });

      window.removeEventListener("unload", () => leaveRoomOnUnmount());
    }
  }, []);

  return (
    <div className={styles.container}>
      {location.state.roomName}
      {playerStatuses && <ListComponent data={playerStatuses} mapFunction={(item, index) => {
        console.log(item)
        return (
          <div key={index}>
            {item.user.inGameName}
          </div>
        )
      }} />}
    </div>
  )
}