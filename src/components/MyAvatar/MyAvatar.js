import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import userService from '../../api/user.api';
import { classes } from './MyAvatar.styles';

export default function MyAvatar({ customStyles, inGameName, id }) {
  const [avatar, setAvatar] = useState();
  const styles = classes();

  useEffect(() => {
    const getAvatar = () => {
      userService.getAvatar(id)
        .then(res => setAvatar(URL.createObjectURL(res)))
        .catch(e => console.log(e))
    }

    getAvatar();
  }, [id]);

  return (
    <Avatar className={customStyles ? customStyles : styles.avatarIcon} src={avatar}>{!avatar && inGameName.charAt(0)}</Avatar>
  )
}
