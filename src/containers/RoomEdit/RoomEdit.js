import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useInput from '../../hooks/UseInput/useInput';
import val from '../../utils/ValidationUtil';
import roomsService from '../../api/rooms.api';
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoomInStore, fetchRoom, roomSelector } from '../../slices/room';

export default function RoomEdit({ classes }) {
  const dispatch = useDispatch()
  const { t } = useTranslation(['buttons', 'inputLabels', 'rooms']);
  const location = useLocation();
  const history = useHistory();

  const { room } = useSelector(roomSelector)
  const [notification, setNotification] = useState();
  const [deleteButtons, setDeleteButtons] = useState();

  const styles = classes()

  const [roomNameInput, roomName, setRoomName] = useInput({
    inputType: "text",
    inputLabel: t('inputLabels:roomName'),
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });

  const [slotsInput, slots, setSlots] = useInput({
    inputType: "number",
    inputLabel: t('inputLabels:slots'),
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });

  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({
    inputType: "password",
    inputLabel: t('inputLabels:roomPassword'),
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });

  useEffect(() => {
    let isMounted = true

    if (isMounted && location.state) {
      if (!room) {
        dispatch(fetchRoom(location.state.roomId))
      }
    } else {
      history.replace(links.home)
    }

    return history.listen((location) => {
      isMounted = false
      if (location.pathname !== links.room) {
        dispatch(deleteRoomInStore())
      }
    })
  }, [location]);

  const capitalize = (inGameName) => {
    if (typeof inGameName !== 'string') return ''
    return inGameName.charAt(0).toUpperCase() + inGameName.slice(1)
  }

  const editRoom = () => {
    const editRoomRequest = {
      id: room.id,
      roomName: capitalize(roomName.value),
      slots: slots.value,
      roomPassword: roomPassword.value,
    };

    if (val.roomRequest(editRoomRequest, setRoomName, setSlots, setRoomPassword, t)) {
      roomsService.editRoom(editRoomRequest)
        .then(res => {
          setNotyficationText(t('rooms:editRoom.roomEditButton'))
          changeToPickRoom()
        })
        .catch(e => {
          setNotyficationText(e.response.data.message)
          console.log(e)
        });
    }
  }

  const deleteRoom = () => {
    roomsService.deleteRoom(room.id)
      .then(res => {
        setNotyficationText(t('rooms:editRoom.roomDeleteResponse'))
        history.push({
          pathname: links.rooms
        });
      })
      .catch(e => {
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

  const showDeleteButtons = () => {
    setDeleteButtons(
      <div className={styles.deleteButtonsContainer}>
        <Button
          variant="outlined"
          color="primary"
          onClick={deleteRoom}
          className={styles.button}>
          {t('menu:confirmationModal.yes')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={styles.button}
          onClick={() => {
            setNotification()
            setDeleteButtons()
          }}>
          {t('menu:confirmationModal.no')}
        </Button>
      </div>
    )
    setNotyficationText(t('rooms:editRoom.deleteRoomConfirmation'))
  }

  const changeToPickRoom = () => {
    history.push({
      pathname: links.room,
      state: {
        roomId: location.state.roomId,
      },
    });
  }

  return (
    <div className={styles.roomEditContainer}>
      <p className={styles.text}>{t('rooms:editRoom.title')}</p>
      {roomNameInput}
      {slotsInput}
      {roomPasswordInput}
      {!deleteButtons &&
        <div className={styles.buttonsContainer}>
          <Button
            variant="outlined"
            color="primary"
            onClick={showDeleteButtons}
            className={styles.button}>
            {t('buttons:delete')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={changeToPickRoom}
            className={styles.button}>
            {t('buttons:back')}
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={editRoom}
            className={styles.button}>
            {t('buttons:editRoom')}
          </Button>
        </div>
      }
      {deleteButtons && deleteButtons}
      {notification && notification}
    </div>
  )
}
