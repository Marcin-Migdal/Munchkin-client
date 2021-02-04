import React from 'react'

export default function RoomSearchListItem({ room, action, mobile, classes }) {
  const { roomName, slots, usersInRoom } = room;

  const styles = classes(room.complete)();

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