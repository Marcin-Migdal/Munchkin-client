import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import roomsService from '../../api/rooms.api';
import useFetchGet from '../../hooks/useFetchGet';
import useInput from '../../hooks/UseInput/useInput';
import ListComponent from '../../components/ListComponent/ListComponent';
import { Button, useTheme } from '@material-ui/core';
import { IconContext } from 'react-icons/lib';
import PlayerListItem from '../../components/PlayerListItem/PlayerListItem';
import { links } from '../../utils/linkUtils';

export default function Room({ classes, mobile }) {
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();

  const styles = classes()

  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({
    inputType: "password",
    inputLabel: "Hasło pokoju",
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });
  
  const [room, setRoom] = useState();
  const [notification, setNotification] = useState();

  const [userData] = useFetchGet({ url: '/api/auth/user' });
  const [playersInRoom, setPlayersInRoomData] = useFetchGet({
    url: '/api/playerStatus/getGameSummary/' + (location.state ? location.state.roomId : history.replace(links.home))
  });

  useEffect(() => {
    const cleanUp = () => {
      setPlayersInRoomData()
      setNotification()
    }

    const fetchRoom = () => {
      roomsService.getRoom(location.state.roomId)
        .then(res => {
          setRoom(res.body)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    if (location.state) {
      fetchRoom()
      cleanUp()
    }
  }, [location, setPlayersInRoomData]);

  const joinRoom = () => {
    const joinRoomRequest = {
      roomId: room.id,
      roomPassword: roomPassword.value,
    };

    roomsService.joinRoom(joinRoomRequest)
      .then(resp => {
        setNotyficationText('Dołączono do pokoju')
        history.push({
          pathname: links.game,
          state: {
            roomId: room.id,
          }
        });
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
      pathname: links.roomEdit,
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

  const goToUserPage = (user) => {
    history.push({
      pathname: links.userPage,
      state: {
        user: user,
      }
    });
  }

  return (
    <div className={styles.roomMenuContainer}>
      {room &&
        <div className={styles.topContainer}>
          <p className={styles.roomNameText}>Pokój: {room.roomName}</p>
          <p className={styles.text}>Gracze w pokoju: {room.usersInRoom}/{room.slots}</p>
        </div>
      }
      <div className={styles.bottomContainer}>
        <div className={styles.passwordContainer}>
          {roomPasswordInput}
          <Button
            variant="outlined"
            color="primary"
            onClick={joinRoom}
            className={styles.button}>
            Dołącz
          </Button>
          {(userData && room) && <EditButton />}
        </div>

        {notification && notification}

        {playersInRoom &&
          <div className={styles.playersContainer}>
            <IconContext.Provider value={{ color: theme.palette.primary.main }}>
              <ListComponent data={playersInRoom} mapFunction={(item, index) => {
                return (
                  <div>
                    <PlayerListItem
                      key={index}
                      mobile={mobile}
                      playerStatus={item}
                      currentUser={userData}
                      creatorId={room.creatorId}
                      action={() => { goToUserPage(item.user) }} />
                  </div>
                )
              }} />
            </IconContext.Provider>
          </div>
        }
      </div>
    </div>
  )
}