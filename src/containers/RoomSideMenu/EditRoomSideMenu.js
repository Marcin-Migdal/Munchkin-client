import React, { useState } from 'react';
import useInput from '../../hooks/UseInput/useInput';
import val from '../../utils/ValidationUtil';
import { classes } from './RoomSideMenu.styles';
import { mobileClasses } from './RoomSideMenuMobile.styles';
import roomsService from '../../api/rooms.api';
import * as IoIcons from "react-icons/io"
import { Button } from '@material-ui/core';

export default function EditRoomSideMenu({ room, changeToPickRoom, mobile }) {
  const [roomNameInput, roomName, setRoomName] = useInput({ inputType: "text", inputLabel: "Nazwa pokoju", size: 'small', color: 'secondary' });
  const [slotsInput, slots, setSlots] = useInput({ inputType: "number", inputLabel: "Sloty", size: 'small', color: 'secondary' });
  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({ inputType: "password", inputLabel: "Hasło pokoju", size: 'small', color: 'secondary' });
  const [notification, setNotification] = useState('');
  const [deleteButtons, setDeleteButtons] = useState();
  const styles = mobile ? mobileClasses() : classes()

  const editRoom = () => {
    const editRoomRequest = {
      id: room.id,
      roomName: roomName.value,
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

  const showDeleteButtons = () => {
    setDeleteButtons(
      <div className={styles.buttonConteiner}>
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
    <div className={styles.roomSideMenuConteiner}>
      <div className={styles.iconConteiner} onClick={() => changeToPickRoom()}>
        <IoIcons.IoIosArrowBack />
      </div>
      <div className={styles.textConteiner}>
        <p className={styles.text}>Edytowanie pokoju</p>
      </div>
      {roomNameInput}
      {slotsInput}
      {roomPasswordInput}
      {!deleteButtons &&
        <div className={styles.buttonConteiner}>
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
