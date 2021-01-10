import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import roomsService from '../../api/rooms.api';
import useFetchGet from '../../hooks/useFetchGet';
import useInput from '../../hooks/UseInput/useInput';
import ListComponent from '../../components/ListComponent/ListComponent';
import FullPlayerListItem from '../../components/FullPlayerListItem/FullPlayerListItem';
import { Button } from '@material-ui/core';
import { IconContext } from 'react-icons/lib';

export default function RoomMenu({ mobile, classes }) {
  const location = useLocation();
  const styles = classes()
  const history = useHistory();

  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({ inputType: "password", inputLabel: "Hasło pokoju", size: 'small', color: 'primary', customClasses: styles.input });
  const [room, setRoom] = useState(location.state.room);
  const [notification, setNotification] = useState();

  const [userData] = useFetchGet({ url: '/api/auth/user' });
  const [playersInRoom, setPlayersInRoomData] = useFetchGet({ url: '/api/playerStatus/allPlayersStatuses/' + room.id });

  useEffect(() => {
    const cleanUp = () => {
      setPlayersInRoomData()
      setRoom(location.state.room)
      setNotification()
    }

    cleanUp()
  }, [location.state.room, setPlayersInRoomData]);

  const joinRoom = () => {
    const joinRoomRequest = {
      roomId: room.id,
      roomPassword: roomPassword.value,
    };

    roomsService.joinRoom(joinRoomRequest)
      .then(resp => {
        setNotyficationText('Dołączono do pokoju')
        // send to game page
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

  const changeToEditRoomMenu = () => {
    history.push({
      pathname: '/editRoom',
      state: {
        room: room,
      },
    });
  }

  const EditButton = () => {
    if (userData.id === room.creatorId) {
      return (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => { changeToEditRoomMenu() }}
          className={styles.button}>
          Edytuj
        </Button>
      )
    } else {
      return <></>
    }
  }

  return (
    <div className={styles.roomMenuConteiner}>
      <div className={styles.topConteiner}>
        <p className={styles.roomNameText}>Pokój: {room.roomName}</p>
        <p className={styles.text}>Gracze w pokoju: {room.usersInRoom}/{room.slots}</p>
      </div>

      <div className={styles.bottomConteiner}>
        <div className={styles.passwordConteiner}>
          {roomPasswordInput}
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

        {playersInRoom &&
          <div className={styles.playersConteiner}>
            <IconContext.Provider value={{ color: '#ffcc00' }}>
              <ListComponent data={playersInRoom} mapFunction={(item, index) => {
                return (
                  <FullPlayerListItem
                    key={index}
                    mobile={mobile}
                    userId={item.user.id}
                    playerName={item.user.inGameName}
                    gender={item.gender}
                    playerLevel={item.playerLevel}
                    isCreator={item.user.id === room.creatorId}
                    action={() => { }} />
                )
              }} />
            </IconContext.Provider>
          </div>
        }
      </div>
    </div>
  )
}