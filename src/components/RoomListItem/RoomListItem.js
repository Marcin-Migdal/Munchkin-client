import React from 'react'
import { useTranslation } from 'react-i18next';
import { classes } from './RoomListItem.styles'

export default function RoomListItem({ room, action, mobile }) {
  const { t } = useTranslation();
  const { roomName, slots, usersInRoom } = room;

  const styles = classes();

  return (
    <div className={mobile ? styles.roomContainerMobile : styles.roomContainerDesktop} onClick={action} >
      <p>{roomName}</p>
      <p>{t('rooms:rooms.slots')} {usersInRoom}/{slots}</p>
    </div>
  )
}