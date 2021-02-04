import React from 'react'
import { classes } from './RoomListItem.styles'

export default function RoomListItem({ room, action, mobile }) {
  const { roomName, slots, usersInRoom } = room;

  const styles = classes();

  return (
    <div className={mobile ? styles.roomContainerMobile : styles.roomContainerDesktop} onClick={action} >
      <p>{roomName}</p>
      <p>Sloty: {usersInRoom}/{slots}</p>
    </div>
  )
}