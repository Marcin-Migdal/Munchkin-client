import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useInput from '../../hooks/UseInput/useInput';
import val from '../../utils/ValidationUtil';
import roomsService from '../../api/rooms.api';

export default function RoomEdit({ classes }) {
  const location = useLocation();
  const styles = classes()
  const history = useHistory();
  const [room, setRoom] = useState(location.state.room);

  const [roomNameInput, roomName, setRoomName] = useInput({ inputType: "text", inputLabel: "Nazwa pokoju", size: 'small', color: 'primary', customClasses: styles.input });
  const [slotsInput, slots, setSlots] = useInput({ inputType: "number", inputLabel: "Sloty", size: 'small', color: 'primary', customClasses: styles.input });
  const [roomPasswordInput, roomPassword, setRoomPassword] = useInput({ inputType: "password", inputLabel: "Hasło pokoju", size: 'small', color: 'primary', customClasses: styles.input });

  const [notification, setNotification] = useState();
  const [deleteButtons, setDeleteButtons] = useState();

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
          changeToPickRoom()
        })
        .catch(e => {
          setNotyficationText(e.response.data.message)
          console.log(e)
        });
    }
  }

  const showDeleteButtons = () => {
    setDeleteButtons(
      <div className={styles.deleteButtonsConteiner}>
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
        history.push({
          pathname: '/rooms'
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
      pathname: '/room',
      state: {
        room: room,
      },
    });
  }

  return (
    <div className={styles.roomEditConteiner}>
      <p className={styles.text}>Edytowanie pokoju</p>
      {roomNameInput}
      {slotsInput}
      {roomPasswordInput}
      {!deleteButtons &&
        <div className={styles.buttonsConteiner}>
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
            onClick={changeToPickRoom}
            className={styles.button}>
            Wróć
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
