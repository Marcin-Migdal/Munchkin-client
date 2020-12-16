import React, { useState } from 'react';
import useInput from '../../hooks/UseInput/useInput';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import val from '../../utils/ValidationUtil';
import { classes } from './RoomSideMenu.styles';
import roomsService from '../../api/rooms.api';

export default function EditRoomSideMenu({ roomId }) {
  const [roomNameInput, roomName, setRoomName] = useInput({ inputType: "text", inputLabel: "Nazwa pokoju", size: 'small' });
  const [slotsInput, slots, setSlots] = useInput({ inputType: "number", inputLabel: "Sloty", size: 'small' });
  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({ inputType: "password", inputLabel: "Hasło pokoju", size: 'small' });
  const [notification, setNotification] = useState('');
  const [modal, setModal] = useState();
  const styles = classes();

  const editRoom = () => {
    const editRoomRequest = {
      id: roomId,
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
    setModal(
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
          action={() => { setModal() }} />
      </div>
    )
    setNotyficationText('Czy na pewno chcesz usnąć ten pokój')
  }

  const deleteRoom = () => {
    roomsService.deleteRoom(roomId)
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
      <div className={styles.textContainer}>
        <p className={styles.text}>Edytowanie pokoju</p>
      </div>
      {roomNameInput}
      {slotsInput}
      {roomPasswordInput}
      {!modal &&
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
      {modal && modal}
      {notification && notification}
    </div>
  )
}
