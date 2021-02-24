import React, { useState } from 'react';
import useInput from '../../hooks/UseInput/useInput';
import val from '../../utils/ValidationUtil';
import { classes } from './RoomSideMenu.styles';
import { mobileClasses } from './RoomSideMenuMobile.styles';
import roomsService from '../../api/rooms.api';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { layoutSelector } from '../../slices/layout';

export default function AddRoomSideMenu() {
  const { t } = useTranslation(['inputLabels']);
  const styles = layout.mobile ? mobileClasses() : classes()

  const { layout } = useSelector(layoutSelector)
  const [notification, setNotification] = useState('');
  
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

  const addRoom = () => {
    const addRoomRequest = {
      roomName: capitalize(roomName.value),
      slots: slots.value,
      roomPassword: roomPassword.value,
    };

    if (val.roomRequest(addRoomRequest, setRoomName, setSlots, setRoomPassword, t)) {
      roomsService.addRoom(addRoomRequest)
        .then(resp => {
          window.location.reload(false);
        })
        .catch(e => {
          console.log(e)
          if (e.response && e.response.status === 400) {
            setNotyficationText(t('rooms:roomSideMenu.roomNameError'))
          } else {
            setNotyficationText(t('rooms:roomSideMenu.addadd.error'))
          }
        });
    }
  }

  const capitalize = (inGameName) => {
    if (typeof inGameName !== 'string') return ''
    return inGameName.charAt(0).toUpperCase() + inGameName.slice(1)
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
      <div className={styles.textContainer}>
        <p className={styles.text}>{t('rooms:roomSideMenu.add.title')}</p>
      </div>
      {roomNameInput}
      {slotsInput}
      {roomPasswordInput}
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={addRoom}
          className={styles.button}>
          {t('rooms:roomSideMenu.add.addRoomButton')}
        </Button>
      </div>
      {notification && notification}
    </div>
  )
}
