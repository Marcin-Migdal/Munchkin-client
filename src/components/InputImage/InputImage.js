import React, { useState } from 'react'
import { classes } from './InputImage.styles'
import * as AiIcons from 'react-icons/ai'
import { IconContext } from 'react-icons/lib';
import { Avatar, Button } from '@material-ui/core';
import userService from '../../api/user.api';

export default function InputImage() {
  const [avatar, setAvatar] = useState();
  const styles = classes();

  const saveAvatar = () => {
    const fd = new FormData();
    fd.append('image', avatar, avatar.name);
    userService.saveAvatar(fd)
      .then(res => {
        console.log(res);
      })
  }

  const selectAvatar = (e) => {
    if (e) {
      setAvatar(e);
    }
  }

  return (
    <IconContext.Provider value={{ color: '#ffcc00' }}>
      <div className={styles.container}>
        <input
          id="contained-button-file"
          type="file"
          accept="image/*"
          hidden
          onInput={(e) => { selectAvatar(e.target.files[0]) }}
          onClick={(e) => { e.target.value = '' }}
        />

        <label htmlFor="contained-button-file">
          <Button
            variant="outlined"
            color="primary"
            component="span"
            className={styles.addAvatarButton}
            startIcon={<AiIcons.AiOutlineUpload className={styles.buttonIcon} />}>
            Wybierz
          </Button>
        </label>

        {avatar &&
          <div className={styles.fileNameContainer} >
            <Button
              variant="outlined"
              color="primary"
              component="span"
              className={styles.addAvatarButton}
              onClick={saveAvatar}>
              Zapisz
            </Button>
            <p className={styles.fileNameText} onClick={() => setAvatar()} >
              {avatar.name}
            </p>
            <Avatar alt="Avatar" src={URL.createObjectURL(avatar)} />
          </div>
        }
      </div>
    </IconContext.Provider>
  )
}
