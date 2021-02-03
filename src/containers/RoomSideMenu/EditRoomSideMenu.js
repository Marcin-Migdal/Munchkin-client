import React, { useState } from 'react';
import useInput from '../../hooks/UseInput/useInput';
import val from '../../utils/ValidationUtil';
import { classes } from './RoomSideMenu.styles';
import { mobileClasses } from './RoomSideMenuMobile.styles';
import roomsService from '../../api/rooms.api';
import * as IoIcons from "react-icons/io"
import { Button } from '@material-ui/core';

export default function EditRoomSideMenu({ room, changeToPickRoom, mobile }) {
  const styles = mobile ? mobileClasses() : classes()
  const [roomNameInput, roomName, setRoomName] = useInput({ inputType: "text", inputLabel: "Nazwa pokoju", size: 'small', color: 'secondary', customClasses: styles.input });
  const [slotsInput, slots, setSlots] = useInput({ inputType: "number", inputLabel: "Sloty", size: 'small', color: 'secondary', customClasses: styles.input });
  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({ inputType: "password", inputLabel: "Hasło pokoju", size: 'small', color: 'secondary', customClasses: styles.input });
  const [notification, setNotification] = useState('');
  const [deleteButtons, setDeleteButtons] = useState();

  const editRoom = () => {
    const editRoomRequest = {
      id: room.id,
      roomName: capitalize(roomName.value),
      slots: slots.value,
      roomPassword: roomPassword.value,
    };

    if (val.roomRequest(editRoomRequest, setRoomName, setSlots, setRoomPassword)) {
      roomsService.editRoom(editRoomRequest)
        .then(resp => {
          setNotyficationText('Pokój został zedytowany')
          window.location.reload(false);
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
      <div className={styles.buttonContainer}>
        <Button
          variant="outlined"
          color="primary"
          onClick={deleteRoom}
          className={styles.button}>
          Tak
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={styles.button}
          onClick={() => {
            setNotification()
            setDeleteButtons()
          }}>
          Nie
        </Button>

      </div>
    )
    setNotyficationText('Czy na pewno chcesz usnąć ten pokój ?')
  }

  const deleteRoom = () => {
    roomsService.deleteRoom(room.id)
      .then(resp => {
        setNotyficationText('Pokój został usunięty')
        window.location.reload(false);
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

  return (
    <div className={styles.roomSideMenuContainer}>
      <div className={styles.iconContainer} onClick={() => changeToPickRoom()}>
        <IoIcons.IoIosArrowBack />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.text}>Edytowanie pokoju</p>
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
            Usuń
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={editRoom}
            className={styles.button}>
            Edytuj
          </Button>
        </div>
      }
      {deleteButtons && deleteButtons}
      {notification && notification}
    </div>
  )
}
