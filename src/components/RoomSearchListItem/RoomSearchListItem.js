import { useTheme } from '@material-ui/core';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function RoomSearchListItem({ room, action, mobile, classes }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const styles = classes(room.complete ? theme.palette.inActive : theme.palette.primary)();

  const { roomName, slots, usersInRoom } = room;

  return (
    <div className={mobile ? styles.roomContainerMobile : styles.roomContainerDesktop} onClick={action} >
      <p>{roomName}</p>
      {room.complete ?
        <p> {t('menu:roomSearchListItem.gameOver')}</p> :
        <p> {t('menu:roomSearchListItem.slots')} {usersInRoom}/{slots} </p>
      }
    </div>
  )
}