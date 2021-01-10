import React, { useState, useEffect } from 'react'
import { classes } from './FullPlayerListItem.styles'
import * as IoIcons from "react-icons/io"
import * as AiIcons from "react-icons/ai"
import { Avatar } from '@material-ui/core';
import userService from '../../api/user.api';

export default function FullPlayerListItem({ mobile, userId, playerName, gender, playerLevel, isCreator, action }) {
  const [avatar, setAvatar] = useState();
  const styles = classes();

  useEffect(() => {
    const getAvatar = () => {
      userService.getAvatar(userId)
        .then(res => setAvatar(URL.createObjectURL(res)))
        .catch(e => console.log(e))
    }

    getAvatar();
  }, [userId]);

  return (
    <div className={mobile ? styles.playerContainerMobile : styles.playerContainerDesktop} onClick={action} >
      <div className={styles.leftContainer}>
        <Avatar className={styles.avatarIcon} src={avatar}>{!avatar && playerName.charAt(0)}</Avatar>
        {isCreator &&
          <AiIcons.AiOutlineCrown className={styles.avatarIcon} />
        }
        <p className={styles.usernameText}>{playerName}</p>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.levelText}>{playerLevel}</div>
        {gender === 'male' ?
          <IoIcons.IoMdMale className={styles.gender} /> :
          <IoIcons.IoMdFemale className={styles.gender} />
        }
      </div>
    </div>
  )
}