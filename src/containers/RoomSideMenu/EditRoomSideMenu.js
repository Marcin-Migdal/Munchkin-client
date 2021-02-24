import React, { useState } from 'react';
import useInput from '../../hooks/UseInput/useInput';
import val from '../../utils/ValidationUtil';
import { classes } from './RoomSideMenu.styles';
import { mobileClasses } from './RoomSideMenuMobile.styles';
import roomsService from '../../api/rooms.api';
import * as IoIcons from "react-icons/io"
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function EditRoomSideMenu({ changeToPickRoom }) {
  const { t } = useTranslation(['inputLabels', 'buttons']);

  const { room, layout } = useSelector((state) => {
    return {
      room: state.room.room,
      layout: state.layout.layout,
    }
  })

  const [notification, setNotification] = useState('');
  const [deleteButtons, setDeleteButtons] = useState();
  const styles = layout.mobile ? mobileClasses() : classes()
  
  const [roomNameInput, roomName, setRoomName] = useInput({
    inputType: "text",
    inputLabel: t('inputLabels:roomName'),
    size: 'small',
    color: 'secondary',
    customClasses: styles.input
  });
  const [slotsInput, slots, setSlots] = useInput({
    inputType: "number",
    inputLabel: t('inputLabels:slots'),
    size: 'small',
    color: 'secondary',
    customClasses: styles.input
  });
  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({
    inputType: "password",
    inputLabel: t('inputLabels:roomPassword'),
    size: 'small',
    color: 'secondary',
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
          window.location.reload(false);
        })
        .catch(e => {
          console.log(e)
          if (e.response && e.response.status === 400) {
            setNotyficationText(t('rooms:roomSideMenu.roomNameError'))
          } else {
            setNotyficationText(t('rooms:edit.editError'))
          }
        });
    }
  }

  const capitalize = (inGameName) => {
    if (typeof inGameName !== 'string') return ''
    return inGameName.charAt(0).toUpperCase() + inGameName.slice(1)
  }

  const showDeleteButtons = () => {
    setDeleteButtons(
      <div className={styles.buttonContainer}>
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
    setNotyficationText(t('rooms:roomSideMenu.edit.deleteConfiramtion'))
  }

  const deleteRoom = () => {
    roomsService.deleteRoom(room.id)
      .then(resp => {
        window.location.reload(false);
      })
      .catch(e => {
        console.log(e)
        setNotyficationText(t('rooms:roomSideMenu.edit.deleteError'))
      });
  }

  const setNotyficationText = (text) => {
    setNotification(
      <div className={styles.notificationText}>
        {text}
      </div>
    )
  }

  return (
    <div className={styles.roomSideMenuContainer}>
      <div className={styles.iconContainer} onClick={() => changeToPickRoom()}>
        <IoIcons.IoIosArrowBack />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.text}>{t('rooms:roomSideMenu.edit.title')}</p>
      </div>
      {roomNameInput}
      {slotsInput}
      {roomPasswordInput}
      {!deleteButtons &&
        <div className={styles.buttonContainer}>
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
