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
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../slices/currentUser';

export default function Room({ classes, mobile }) {
  const { currentUser, currentUserLoading } = useSelector(currentUserSelector)
  const { t } = useTranslation(['buttons', 'inputLabels', 'rooms']);
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();

  const styles = classes()
  
  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({
    inputType: "password",
    inputLabel: t('inputLabels:password'),
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });

  const [room, setRoom] = useState();
  const [playersInRoom, setPlayersInRoomData] = useFetchGet({
    url: '/api/playerStatus/getGameSummary/' + (location.state ? location.state.roomId : history.replace(links.home))
  });
  
  const [notification, setNotification] = useState();

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
        history.push({
          pathname: links.game,
          state: {
            roomId: room.id,
          }
        });
      })
      .catch(e => {
        console.log(e)
        setRoomPassword('')
        if (e.response && (
          e.response.status === 404 ||
          e.response.status === 401 ||
          e.response.status === 400)) {
          setNotyficationText(e.response.data.message)
        } else {
          setNotyficationText(t('rooms:pickRoom.error'))
        }
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
      {(room && !currentUserLoading) &&
        <div className={styles.topContainer}>
          <p className={styles.roomNameText}>{t('rooms:pickRoom.title')} {room.roomName}</p>
          <p className={styles.text}>{t('rooms:pickRoom.slots')} {room.usersInRoom}/{room.slots}</p>

          <div className={styles.passwordContainer}>
            {roomPasswordInput}
            <Button
              variant="outlined"
              color="primary"
              onClick={joinRoom}
              className={styles.button}>
              {t('buttons:joinRoom')}
            </Button>
            {(currentUser && currentUser.id === room.creatorId) &&
              <Button
                variant="outlined"
                color="primary"
                onClick={() => { changeToEditRoomMenu() }}
                className={styles.button}>
                {t('buttons:editRoom')}
              </Button>
            }
          </div>
        </div>
      }
      <div className={styles.bottomContainer}>
        {notification && notification}
        {(!currentUserLoading && currentUser && playersInRoom && room) &&
          <div className={styles.playersContainer}>
            <ListComponent data={playersInRoom} mapFunction={(playerStatus, index) => {
              return (
                <IconContext.Provider key={index} value={{ color: playerStatus.playerInRoom ? theme.palette.primary.main : theme.palette.inActive.main }}>
                  <PlayerListItem
                    mobile={mobile}
                    playerStatus={playerStatus}
                    currentUser={currentUser}
                    creatorId={room.creatorId}
                    isInRoom={playerStatus.playerInRoom}
                    action={() => { goToUserPage(playerStatus.user) }} />
                </IconContext.Provider>
              )
            }} />
          </div>
        }
      </div>
    </div>
  )
}