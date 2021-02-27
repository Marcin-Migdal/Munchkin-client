import React, { useEffect, useState } from 'react';
import { classes } from './RoomSideMenu.styles';
import { mobileClasses } from './RoomSideMenuMobile.styles';
import roomsService from '../../api/rooms.api';
import useInput from '../../hooks/UseInput/useInput';
import MyHr from '../../components/MyHr/MyHr';
import ListComponent from '../../components/ListComponent/ListComponent';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ShortPlayerListItem from '../../components/ShortPlayerListItem/ShortPlayerListItem';
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import playerStatusService from '../../api/playerStatus.api';

export default function PickRoomSideMenu({ changeToEditRoom }) {
  const { t } = useTranslation(['inputLabels', 'buttons']);
  const history = useHistory();

  const { room, layout, currentUser } = useSelector((state) => {
    return {
      room: state.room.room,
      layout: state.layout.layout,
      currentUser: state.currentUser.currentUser
    }
  })

  const [notification, setNotification] = useState();
  const [playersInRoom, setPlayersInRoom] = useState();
  const styles = layout.mobile ? mobileClasses() : classes()

  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({
    inputType: "password",
    inputLabel: t('inputLabels:roomPassword'),
    size: 'small',
    color: 'secondary',
    customClasses: styles.input
  });

  useEffect(() => {
    let isMounted = true

    const fetchPlayerStatuses = () => {
      setPlayersInRoom()
      playerStatusService.getAllSortedPlayersStatusesInRoom(room.id)
        .then((res) => setPlayersInRoom(res.body))
        .catch((e) => console.log(e))
    }

    isMounted && fetchPlayerStatuses()

    return () => {
      isMounted = false
    }
  }, [room]);

  const joinRoom = () => {
    const joinRoomRequest = {
      roomId: room.id,
      roomPassword: roomPassword.value,
    };

    roomsService.joinRoom(joinRoomRequest)
      .then(res => {
        history.push({
          pathname: links.game,
          state: {
            roomId: room.id,
          }
        });
      })
      .catch(e => {
        console.log(e)
        const conditionArray = [400, 401, 404]
        setRoomPassword('')
        if (e.response && conditionArray.includes(conditionArray)) {
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

  const goToUserPage = (user) => {
    history.push({
      pathname: links.userPage,
      state: {
        user: user,
      }
    });
  }

  return (
    <>
      {(room && currentUser) &&
        <div className={styles.roomSideMenuContainer}>
          <div className={styles.textContainer}>
            <p className={styles.roomNameText}>{t('rooms:pickRoom.title')} {room.roomName}</p>
            <p className={styles.text}>{t('rooms:pickRoom.slots')} {room.usersInRoom}/{room.slots}</p>
            {roomPasswordInput}
          </div>
          <div className={styles.buttonContainer}>
            <Button
              variant="outlined"
              color="primary"
              onClick={joinRoom}
              className={styles.button}>
              {t('buttons:joinRoom')}
            </Button>
            {currentUser.id === room.creatorId &&
              <Button
                variant="outlined"
                color="primary"
                onClick={changeToEditRoom}
                className={styles.button}>
                {t('buttons:editRoom')}
              </Button>
            }
          </div>
          {notification && notification}
          <MyHr />
          {playersInRoom &&
            <div className={styles.playersContainer}>
              <ListComponent data={playersInRoom} mapFunction={(playerStatus, index) => {
                return (
                  <ShortPlayerListItem
                    key={index}
                    mobile={layout.mobile}
                    playerStatus={playerStatus}
                    isCreator={playerStatus.user.id === room.creatorId}
                    action={() => goToUserPage(playerStatus.user)} />
                )
              }} />
            </div>
          }
        </div>
      }
    </>
  )
}