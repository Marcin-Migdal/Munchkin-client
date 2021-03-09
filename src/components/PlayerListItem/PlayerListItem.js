import React from 'react'
import { classes } from './PlayerListItem.styles'
import * as IoIcons from "react-icons/io"
import * as AiIcons from "react-icons/ai"
import PlayerStatisticsComponent from '../PlayerStatisticsComponent/PlayerStatisticsComponent'
import MyAvatar from '../MyAvatar/MyAvatar'
import { useTheme } from '@material-ui/core'

export default function PlayerListItem({ mobile, playerStatus, creatorId, action }) {
  const theme = useTheme();

  const { playerBonus, playerLevel, gender, playerInRoom } = playerStatus;
  const { inGameName, id } = playerStatus.user

  const styles = classes(playerInRoom ? theme.palette.primary : theme.palette.inActive)();

  return (
    <div className={mobile ? styles.containerMobile : styles.containerDesktop} onClick={action} >
      <div className={styles.leftContainer}>
        <MyAvatar inGameName={inGameName} id={playerStatus.user.id} />
        {creatorId === id &&
          <AiIcons.AiOutlineCrown className={styles.creatorIcon} />
        }
        <p className={styles.usernameText}>{inGameName}</p>
      </div>
      <div className={styles.rightContainer}>
        <PlayerStatisticsComponent
          style={styles.textContainer}
          content={playerLevel}
          type='level'
          mobile={mobile} />
        <PlayerStatisticsComponent
          style={playerBonus < 9 ? styles.textContainer : styles.bigTextContainer}
          content={playerBonus}
          type='bonus'
          mobile={mobile} />
        <PlayerStatisticsComponent
          style={playerLevel + playerBonus < 9 ? styles.textContainer : styles.bigTextContainer}
          content={playerLevel + playerBonus}
          type='power'
          mobile={mobile} />
        {gender === 'male' ?
          <IoIcons.IoMdMale className={styles.gender} /> :
          <IoIcons.IoMdFemale className={styles.gender} />
        }
      </div>
    </div>
  )
}