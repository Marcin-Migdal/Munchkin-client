import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useInput from '../../hooks/UseInput/useInput';
import val from '../../utils/ValidationUtil';
import roomsService from '../../api/rooms.api';
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';

export default function RoomEdit({ classes }) {
  const { t } = useTranslation(['translation', 'buttons', 'inputLabels', 'rooms']);
  const location = useLocation();
  const history = useHistory();

  const [room] = useState((location.state ? location.state.room : history.replace(links.home)));
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

  const editRoom = () => {
    const editRoomRequest = {
      id: room.id,
      roomName: capitalize(roomName.value),
      slots: slots.value,
      roomPassword: roomPassword.value,
    };

    if (val.roomRequest(editRoomRequest, setRoomName, setSlots, setRoomPassword, t)) {
      roomsService.editRoom(editRoomRequest)
        .then(resp => {
          setNotyficationText(t('rooms:editRoom.roomEditButton'))
          changeToPickRoom()
        })
        .catch(e => {
          setNotyficationText(e.response.data.message)
          console.log(e)
        });
    }
  }

  const capitalize = (inGameName) => {
    if (typeof inGameName !== 'string') return ''
    return inGameName.charAt(0).toUpperCase() + inGameName.slice(1)
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

  const deleteRoom = () => {
    roomsService.deleteRoom(room.id)
      .then(resp => {
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

  const changeToPickRoom = () => {
    history.push({
      pathname: links.room,
      state: {
        roomId: room.id,
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
