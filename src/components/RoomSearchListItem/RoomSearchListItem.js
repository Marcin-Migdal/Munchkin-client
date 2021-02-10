import { useTheme } from '@material-ui/core';
import React from 'react'

export default function RoomSearchListItem({ room, action, mobile, classes }) {
  const theme = useTheme();
  const styles = classes(room.complete ? theme.palette.inActive : theme.palette.primary)();

  const { roomName, slots, usersInRoom } = room;

  return (
    <div className={mobile ? styles.roomContainerMobile : styles.roomContainerDesktop} onClick={action} >
      <p>{roomName}</p>
      {room.complete ?
        <p> Gra skończona </p> :
        <p> Sloty: {usersInRoom}/{slots} </p>
      }
    </div>
  )
}