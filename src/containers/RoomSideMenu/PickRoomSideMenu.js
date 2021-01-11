import React, { useEffect, useState } from 'react';
import { classes } from './RoomSideMenu.styles';
import { mobileClasses } from './RoomSideMenuMobile.styles';
import roomsService from '../../api/rooms.api';
import useFetchGet from '../../hooks/useFetchGet';
import useInput from '../../hooks/UseInput/useInput';
import MyHr from '../../components/MyHr/MyHr';
import ListComponent from '../../components/ListComponent/ListComponent';
import PlayerListItem from '../../components/PlayerListItem/PlayerListItem';
import { Button } from '@material-ui/core';

export default function PickRoomSideMenu({ room, changeToEditRoom, mobile }) {
  const styles = mobile ? mobileClasses() : classes()
  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({ inputType: "password", inputLabel: "Hasło pokoju", size: 'small', color: 'secondary', customClasses: styles.input});
  const [notification, setNotification] = useState();
  const [userData] = useFetchGet({ url: '/api/auth/user' });
  const [playersInRoom, setPlayersInRoomData] = useFetchGet({ url: '/api/playerStatus/allPlayersStatuses/' + room.id });

  useEffect(() => {
    const cleanUp = () => {
      setPlayersInRoomData()
      setNotification()
    }

    cleanUp()
  }, [room, setPlayersInRoomData]);

  const joinRoom = () => {
    const joinRoomRequest = {
      roomId: room.id,
      roomPassword: roomPassword.value,
    };

    roomsService.joinRoom(joinRoomRequest)
      .then(resp => {
        setNotyficationText('Dołączono do pokoju')
        window.location.reload(false);
      })
      .catch(e => {
        setRoomPassword('')
        setNotyficationText(e.response.data.message)
        console.log(e)
      });
  }

  const setNotyficationText = (text) => {
    setNotification(
      <div className={styles.notificationText}>
        {text}
      </div>
    )
  }

  const EditButton = () => {
    if (userData.id === room.creatorId) {
      return (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => { changeToEditRoom(room) }}
          className={styles.button}>
          Edytuj
        </Button>
      )
    } else {
      return <></>
    }
  }

  return (
    <div className={styles.roomSideMenuContainer}>
      <div className={styles.textContainer}>
        <p className={styles.roomNameText}>{room.roomName}</p>
        <p className={styles.text}>Sloty: {room.usersInRoom}/{room.slots}</p>
        {roomPasswordInput}
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="outlined"
          color="primary"
          onClick={joinRoom}
          className={styles.button}>
          Dołącz
        </Button>
        {userData && <EditButton />}
      </div>
      {notification && notification}
      <MyHr />
      {playersInRoom &&
        <div className={styles.playersContainer}>
          <ListComponent data={playersInRoom} mapFunction={(item, index) => {
            return (
              <PlayerListItem
                key={index}
                mobile={mobile}
                userId={item.user.id}
                playerName={item.user.inGameName}
                gender={item.gender}
                playerLevel={item.playerLevel}
                action={() => { }} />
            )
          }} />
        </div>
      }
    </div>
  )
}