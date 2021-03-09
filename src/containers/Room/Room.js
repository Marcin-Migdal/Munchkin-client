import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import roomsService from '../../api/rooms.api';
import useInput from '../../hooks/UseInput/useInput';
import ListComponent from '../../components/ListComponent/ListComponent';
import { Button, useTheme } from '@material-ui/core';
import { IconContext } from 'react-icons/lib';
import PlayerListItem from '../../components/PlayerListItem/PlayerListItem';
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import playerStatusService from '../../api/playerStatus.api';
import { deleteRoomInStore, fetchRoom } from '../../slices/room';

export default function Room({ classes }) {
  const dispatch = useDispatch()
  const { t } = useTranslation(['buttons', 'inputLabels', 'rooms']);
  const theme = useTheme();
  const location = useLocation();
  const history = useHistory();
  const styles = classes()

  const { room, layout, currentUser, currentUserLoading } = useSelector((state) => {
    return {
      room: state.room.room,
      layout: state.layout.layout,
      currentUser: state.currentUser.currentUser,
      currentUserLoading: state.currentUser.currentUserLoading
    }
  })

  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({
    inputType: "password",
    inputLabel: t('inputLabels:password'),
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });

  const [playersInRoom, setPlayersInRoom] = useState();
  const [notification, setNotification] = useState();

  useEffect(() => {
    let isMounted = true

    const fetchPlayersInRoom = () => {
      playerStatusService.getAllSortedPlayersStatusesInRoom(location.state.roomId)
        .then(res => {
          setPlayersInRoom(res.body)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    if (isMounted && location.state) {
      !room && dispatch(fetchRoom(location.state.roomId))
      !playersInRoom && fetchPlayersInRoom()
    } else {
      history.replace(links.home)
    }

    return history.listen((location) => {
      isMounted = false
      const conditionArray = [links.roomEdit, links.userPage, links.game]
      if (!conditionArray.includes(location.pathname)) {
        dispatch(deleteRoomInStore())
      }
    })

  }, [location, setPlayersInRoom, room]);

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
            roomId: location.state.roomId,
          }
        });
      })
      .catch(e => {
        const conditionArray = [400, 401, 404]
        console.log(e)
        setRoomPassword('')
        if (e.response && conditionArray.includes(e.response.status)) {
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
        roomId: room.id,
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
      {(room && !currentUserLoading && currentUser) &&
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
            {(currentUser.id === room.creatorId) &&
              <Button
                variant="outlined"
                color="primary"
                onClick={changeToEditRoomMenu}
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
                    mobile={layout.mobile}
                    playerStatus={playerStatus}
                    currentUser={currentUser}
                    creatorId={room.creatorId}
                    action={() => goToUserPage(playerStatus.user)} />
                </IconContext.Provider>
              )
            }} />
          </div>
        }
      </div>
    </div>
  )
}