import React, { useEffect, useState } from 'react';
import { classes } from './RoomSideMenu.styles';
import { mobileClasses } from './RoomSideMenuMobile.styles';
import roomsService from '../../api/rooms.api';
import useFetchGet from '../../hooks/useFetchGet';
import useInput from '../../hooks/UseInput/useInput';
import MyHr from '../../components/MyHr/MyHr';
import ListComponent from '../../components/ListComponent/ListComponent';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ShortPlayerListItem from '../../components/ShortPlayerListItem/ShortPlayerListItem';
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';

export default function PickRoomSideMenu({ room, changeToEditRoom, mobile }) {
  const { t } = useTranslation(['inputLabels', 'buttons']);
  const history = useHistory();

  const styles = mobile ? mobileClasses() : classes()

  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({
    inputType: "password",
    inputLabel: t('inputLabels:roomPassword'),
    size: 'small',
    color: 'secondary',
    customClasses: styles.input
  });

  const [notification, setNotification] = useState();
  const [userData] = useFetchGet({ url: '/api/auth/user' });
  const [playersInRoom, setPlayersInRoomData] = useFetchGet({ url: '/api/playerStatus/allPlayersStatusesInRoom/' + room.id });

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

  const EditButton = () => {
    if (userData.id === room.creatorId) {
      return (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => { changeToEditRoom(room) }}
          className={styles.button}>
          {t('buttons:editRoom')}
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
        {userData && <EditButton />}
      </div>
      {notification && notification}
      <MyHr />
      {playersInRoom &&
        <div className={styles.playersContainer}>
          <ListComponent data={playersInRoom} mapFunction={(item, index) => {
            return (
              <ShortPlayerListItem
                key={index}
                mobile={mobile}
                playerStatus={item}
                isCreator={item.user.id === room.creatorId}
                action={() => { goToUserPage(item.user) }} />
            )
          }} />
        </div>
      }
    </div>
  )
}