import React, { useState, useEffect } from 'react'
import { classes } from './PlayerListItem.styles'
import * as IoIcons from "react-icons/io"
import { Avatar } from '@material-ui/core';
import userService from '../../api/user.api';

export default function PlayerListItem({ mobile, userId, playerName, gender, playerLevel, action }) {
  const [avatar, setAvatar] = useState();
  const styles = classes();

  useEffect(() => {
    getAvatar();
  }, []);

  const getAvatar = () => {
    userService.getAvatar(userId)
      .then(res => setAvatar(URL.createObjectURL(res)))
      .catch(e => console.log(e))
  }

  return (
    <div className={mobile ? styles.roomContainerMobile : styles.roomContainerDesktop} onClick={action} >
      <div className={styles.leftContainer}>
        <Avatar className={styles.avatarIcon} src={avatar}>{!avatar && playerName.charAt(0)}</Avatar>
        <p className={styles.usernameText}>{playerName}</p>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.levelText}>{playerLevel}</div>
        {gender === 'male' ?
          <IoIcons.IoMdMale className={styles.genderMale} /> :
          <IoIcons.IoMdFemale className={styles.genderFemale} />
        }
      </div>
    </div>
  )
}