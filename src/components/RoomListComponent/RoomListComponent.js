import React from 'react'
import { classes } from './RoomListComponent.styles'

export default function RoomListComponent({ roomName, slots, usersInRoom, action, mobile }) {
  const styles = classes();

  return (
    <div className={mobile ? styles.roomContainerMobile : styles.roomContainerDesktop} onClick={action} >
      <p>{roomName}</p>
      <p>Sloty: {usersInRoom}/{slots}</p>
    </div>
  )
}