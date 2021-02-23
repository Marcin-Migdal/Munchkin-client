import React, { useState } from 'react'
import { desktopClasses } from './InputImage.styles'
import { mobileClasses } from './InputImageMobile.styles'
import * as AiIcons from 'react-icons/ai'
import { Avatar, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { layoutSelector } from '../../slices/layout';

export default function InputImage({ hasAvatar, saveAvatar, deleteAvatar }) {
  const { layout } = useSelector(layoutSelector)
  const { t } = useTranslation(['buttons']);

  const [avatar, setAvatar] = useState();
  const styles = layout.mobile ? mobileClasses() : desktopClasses();

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

      <div  className={styles.buttonContainer}>
        <label htmlFor="contained-button-file">
          <Button
            variant="outlined"
            color="primary"
            component="span"
            className={styles.button}
            startIcon={<AiIcons.AiFillFileAdd className={styles.buttonIcon} />}>
            {t('buttons:chooseAvatar')}
          </Button>
        </label>
        {(hasAvatar && !avatar) &&
          <Button
            variant="outlined"
            color="primary"
            className={styles.button}
            startIcon={<AiIcons.AiFillDelete className={styles.buttonIcon} />}
            onClick={() => { deleteAvatar() }}>
            {t('buttons:delete')}
          </Button>
        }
        {avatar &&
          <Button
            variant="outlined"
            color="primary"
            className={styles.button}
            startIcon={<AiIcons.AiOutlineUpload className={styles.buttonIcon} />}
            onClick={handleSave}>
            {t('buttons:save')}
          </Button>
        }
      </div>

      {avatar &&
        <div className={styles.fileNameContainer} >
          <p className={styles.fileNameText} onClick={() => setAvatar()} >
            {avatar.name}
          </p>
          <Avatar alt="Avatar" src={URL.createObjectURL(avatar)} />
        </div>
      }
    </div>
  )
}
