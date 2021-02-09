import React, { useState } from 'react'
import { classes } from './InputImage.styles'
import * as AiIcons from 'react-icons/ai'
import { Avatar, Button } from '@material-ui/core';

export default function InputImage({ hasAvatar, saveAvatar, deleteAvatar }) {
  const [avatar, setAvatar] = useState();
  const styles = classes();

  const selectAvatar = (e) => {
    if (e) {
      setAvatar(e.target.files[0]);
    }
  }

  const handleSave = () => {
    saveAvatar(avatar)
    setAvatar()
  }

  return (
    <div className={styles.container}>
      <input
        id="contained-button-file"
        type="file"
        accept="image/*"
        hidden
        onInput={selectAvatar}
        onClick={(e) => { e.target.value = '' }}
      />

      <label htmlFor="contained-button-file">
        <Button
          variant="outlined"
          color="primary"
          component="span"
          className={styles.button}
          startIcon={<AiIcons.AiFillFileAdd className={styles.buttonIcon} />}>
          Wybierz
          </Button>
        {(hasAvatar && !avatar) &&
          <Button
            variant="outlined"
            color="primary"
            className={styles.button}
            startIcon={<AiIcons.AiFillDelete className={styles.buttonIcon} />}
            onClick={() => { deleteAvatar() }}>
            Usuń
        </Button>
        }
      </label>

      {avatar &&
        <div className={styles.fileNameContainer} >
          <Button
            variant="outlined"
            color="primary"
            component="span"
            className={styles.button}
            startIcon={<AiIcons.AiOutlineUpload className={styles.buttonIcon} />}
            onClick={handleSave}>
            Zapisz
            </Button>
          <p className={styles.fileNameText} onClick={() => setAvatar()} >
            {avatar.name}
          </p>
          <Avatar alt="Avatar" src={URL.createObjectURL(avatar)} />
        </div>
      }
    </div>
  )
}
