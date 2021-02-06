import React from 'react'
import { classes } from './PlayerListItem.styles'
import * as IoIcons from "react-icons/io"
import * as AiIcons from "react-icons/ai"
import PlayerStatisticsComponent from '../PlayerStatisticsComponent/PlayerStatisticsComponent'
import MyAvatar from '../MyAvatar/MyAvatar'

export default function PlayerListItem({ mobile, playerStatus, creatorId, action, isInRoom }) {
  const styles = classes();
  const { playerBonus, playerLevel, gender } = playerStatus;
  const { inGameName, id } = playerStatus.user

  return (
    <div className={mobile ? styles.containerMobile : styles.containerDesktop} onClick={action} >
      <div className={styles.leftContainer}>
        <MyAvatar inGameName={inGameName} id={playerStatus.user.id}/>
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