import React, { useState } from 'react';
import useInput from '../../hooks/UseInput/useInput';
import val from '../../utils/ValidationUtil';
import { classes } from './RoomSideMenu.styles';
import { mobileClasses } from './RoomSideMenuMobile.styles';
import roomsService from '../../api/rooms.api';
import { Button } from '@material-ui/core';

export default function AddRoomSideMenu({ mobile }) {
  const styles = mobile ? mobileClasses() : classes()
  const [roomNameInput, roomName, setRoomName] = useInput({ inputType: "text", inputLabel: "Nazwa pokoju", size: 'small', color: 'secondary', customClasses: styles.input });
  const [slotsInput, slots, setSlots] = useInput({ inputType: "number", inputLabel: "Sloty", size: 'small', color: 'secondary', customClasses: styles.input });
  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({ inputType: "password", inputLabel: "Hasło pokoju", size: 'small', color: 'secondary', customClasses: styles.input });
  const [notification, setNotification] = useState('');

  const addRoom = () => {
    const addRoomRequest = {
      roomName: roomName.value,
      slots: slots.value,
      roomPassword: roomPassword.value,
    };

    if (val.roomRequest(addRoomRequest, setRoomName, setSlots, setRoomPassword)) {
      roomsService.addRoom(addRoomRequest)
        .then(resp => {
          setNotyficationText('Pokój został założony')
          window.location.reload(false);
        })
        .catch(e => {
          setNotyficationText(e.response.data.message)
          console.log(e)
        });
    }
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
        <p className={styles.text}>Dodawanie pokoju</p>
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
          Stwórz pokój
        </Button>
      </div>
      {notification && notification}
    </div>
  )
}
