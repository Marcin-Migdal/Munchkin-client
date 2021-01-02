import React, { useState } from 'react';
import useInput from '../../hooks/UseInput/useInput';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import val from '../../utils/ValidationUtil';
import { classes } from './RoomSideMenu.styles';
import { mobileClasses } from './RoomSideMenuMobile.styles';
import roomsService from '../../api/rooms.api';
import * as IoIcons from "react-icons/io"

export default function EditRoomSideMenu({ room, changeToPickRoom, mobile }) {
  const [roomNameInput, roomName, setRoomName] = useInput({ inputType: "text", inputLabel: "Nazwa pokoju", size: 'small' });
  const [slotsInput, slots, setSlots] = useInput({ inputType: "number", inputLabel: "Sloty", size: 'small' });
  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({ inputType: "password", inputLabel: "Hasło pokoju", size: 'small' });
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
      <div className={styles.buttonContainer}>
        <ButtonComponent
          text='Tak'
          btnStyle={styles.button}
          variantStyle='outlined'
          paletteColor='primary'
          action={deleteRoom} />
        <ButtonComponent
          text='Nie'
          btnStyle={styles.button}
          variantStyle='outlined'
          paletteColor='primary'
          action={() => {
            setNotification()
            setDeleteButtons()
          }} />
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
          <ButtonComponent
            text='Usuń'
            btnStyle={styles.button}
            variantStyle='outlined'
            paletteColor='primary'
            action={showDeleteButtons} />
          <ButtonComponent
            text='Edytuj'
            btnStyle={styles.button}
            variantStyle='outlined'
            paletteColor='primary'
            action={editRoom} />
        </div>
      }
      {deleteButtons && deleteButtons}
      {notification && notification}
    </div>
  )
}
