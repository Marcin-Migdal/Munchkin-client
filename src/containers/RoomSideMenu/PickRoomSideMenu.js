import React, { useEffect, useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { classes } from './RoomSideMenu.styles';
import roomsService from '../../api/rooms.api';

export default function PickRoomSideMenu({ room, changeToEditRoom }) {
  const [notification, setNotification] = useState();
  const styles = classes();

  useEffect(() => {
    setNotification()
  }, [room]);

  const joinRoom = () => {
    const joinRoomRequest = {
      roomId: room.id,
      roomPassword: room.roomPassword,
    };

    roomsService.joinRoom(joinRoomRequest)
      .then(resp => { })
      .catch(e => {
        setNotification(
          <div className={styles.notificationText}>
            {e.response.data.message}
          </div>
        )
        console.log(e)
      });
  }

  return (
    <div className={styles.roomSideMenuContainer}>
      <div className={styles.textContainer}>
        <p className={styles.text}>{room.roomName}</p>
        <p className={styles.text}>Sloty: {room.usersInRoom}/{room.slots}</p>
      </div>
      <div className={styles.buttonContainer}>
        <ButtonComponent
          id='addButton'
          text='Edytuj'
          btnStyle={styles.button}
          variantStyle='outlined'
          paletteColor='primary'
          action={() => changeToEditRoom(room.id)} />

        <ButtonComponent
          text='Dołącz'
          btnStyle={styles.button}
          variantStyle='outlined'
          paletteColor='primary'
          action={joinRoom} />
      </div>
      {notification && notification}
    </div>
  )
}
