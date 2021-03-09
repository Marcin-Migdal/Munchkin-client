import React from 'react'
import * as IoIcons from "react-icons/io"
import * as AiIcons from "react-icons/ai"
import { classes } from './ShortPlayerListItem.styles'
import PlayerStatisticsComponent from '../PlayerStatisticsComponent/PlayerStatisticsComponent';
import MyAvatar from '../MyAvatar/MyAvatar';
import { useTheme } from '@material-ui/core';

export default function ShortPlayerListItem({ mobile, playerStatus, isCreator, action }) {
  const theme = useTheme();

  const { playerLevel, gender, playerInRoom } = playerStatus;
  const { inGameName, id } = playerStatus.user;

  const styles = classes(playerInRoom ? theme.palette.background : theme.palette.inActive)()

  return (
    <div className={mobile ? styles.playerContainerMobile : styles.playerContainerDesktop} onClick={action} >
      <div className={styles.leftContainer}>
        <MyAvatar inGameName={inGameName} id={id} />
        {isCreator &&
          <AiIcons.AiOutlineCrown className={styles.creatorIcon} />
        }
        <p className={styles.usernameText}>{inGameName}</p>
      </div>
      <div className={styles.rightContainer}>
        <PlayerStatisticsComponent
          style={styles.levelText}
          content={playerLevel}
          type='sideMenu'
          mobile={mobile} />
        {gender === 'male' ?
          <IoIcons.IoMdMale className={styles.gender} /> :
          <IoIcons.IoMdFemale className={styles.gender} />
        }
      </div>
    </div>
  )
}