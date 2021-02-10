import React from 'react'
import * as IoIcons from "react-icons/io"
import * as AiIcons from "react-icons/ai"
import { classes } from './ShortPlayerListItem.styles'
import PlayerStatisticsComponent from '../PlayerStatisticsComponent/PlayerStatisticsComponent';
import MyAvatar from '../MyAvatar/MyAvatar';

export default function ShortPlayerListItem({ mobile, playerStatus, isCreator, action }) {
  const { playerLevel, gender } = playerStatus;
  const { inGameName, userId } = playerStatus.user;
  
  const styles = classes();

  return (
    <div className={mobile ? styles.playerContainerMobile : styles.playerContainerDesktop} onClick={action} >
      <div className={styles.leftContainer}>
        <MyAvatar inGameName={inGameName} id={userId} />
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