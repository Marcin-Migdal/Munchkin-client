import { Button, FormControlLabel, Radio, RadioGroup, useTheme } from '@material-ui/core';
import React, { useState } from 'react'
import InputImage from '../../components/InputImage/InputImage'
import MyHr from '../../components/MyHr/MyHr';
import useInput from '../../hooks/UseInput/useInput';
import { IconContext } from 'react-icons/lib';
import * as IoIcons from "react-icons/io"
import userService from '../../api/user.api';
import val from '../../utils/ValidationUtil';
import useFetchGet from '../../hooks/useFetchGet';
import { useTranslation } from 'react-i18next';

export default function Settings({ classes }) {
  const { t, i18n } = useTranslation(['settings', 'buttons', 'inputLabels']);
  const theme = useTheme();
  const styles = classes();

  const [userRefreshFlag, setUserRefreshFlag] = useState(0);
  const [userData] = useFetchGet({ url: '/api/auth/user', reloadFlag: userRefreshFlag });

  const [userNameInput, userName, setUserName] = useInput({
    inputType: "text",
    inputLabel: t('inputLabels:username'),
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });
  const [inGameNameInput, inGameName, setInGameName] = useInput({
    inputType: "text",
    inputLabel: t('inputLabels:inGameName'),
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });
  const [oldPasswordInput, oldPassword, setOldPassword] = useInput({
    inputType: "password",
    inputLabel: t('settings:inputLabel.oldPassword'),
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });
  const [newPasswordInput, newPassword, setNewPassword] = useInput({
    inputType: "password",
    inputLabel: t('settings:inputLabel.newPassword'),
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });
  const [newRePasswordInput, newRePassword, setNewRePassword] = useInput({
    inputType: "password",
    inputLabel: t('inputLabels:rePassword'),
    size: 'small',
    color: 'primary',
    customClasses: styles.input
  });

  const [gender, setGender] = useState('male');

  const [notification, setNotification] = useState();
  const [segment, setSegment] = useState();

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const changeSegment = (newSegment) => {
    setNotification()
    if (segment === newSegment) {
      setSegment()
    } else {
      setSegment(newSegment)
    }
  }

  const editUser = () => {
    const editUserRequest = {
      username: userName.value,
      inGameName: capitalize(inGameName.value),
      gender: gender
    };

    if (val.editUserRequest(editUserRequest, setUserName, setInGameName, t)) {
      userService.editUser(editUserRequest)
        .then(resp => {
          setNotyficationText(t('settings:response.editUser'))
        })
        .catch(e => {
          if (e.response && e.response.status === 400) {
            setNotyficationText(e.response.data.message)
          } else {
            setNotyficationText(t('settings:error.editUser'))
          }
        });
    }
  }

  const capitalize = (inGameName) => {
    if (typeof inGameName !== 'string') return ''
    return inGameName.charAt(0).toUpperCase() + inGameName.slice(1)
  }

  const editPassword = () => {
    setStateCleanUp()

    const editUserPasswordRequest = {
      username: userData.username,
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      newRePassword: newRePassword.value,
    };

    if (val.editUserPasswordRequest(editUserPasswordRequest, setOldPassword, setNewPassword, setNewRePassword, t)) {
      userService.editUserPassword(editUserPasswordRequest)
        .then(resp => {
          setNotyficationText(t('settings:response.editPassword'))
        })
        .catch(e => {
          console.log(e)
          if (e.response && e.response.data.status === 401) {
            setNotyficationText(t('settings:error.oldPasswordIncorrect'))
          } else {
            setNotyficationText(t('settings:error.editPassword'))
          }
        });
    }
  }

  const setNotyficationText = (text) => {
    setNotification(
      <div className={styles.notificationText}>
        {text}
      </div>
    )
  }

  const setStateCleanUp = () => {
    setNewPassword(state => ({ ...state, inputError: false, errorMessage: '' }));
    setNewRePassword(state => ({ ...state, inputError: false, errorMessage: '' }));
  }

  const saveAvatar = (avatar) => {
    if (avatar.size < 500000) {
      const fd = new FormData();
      fd.append('image', avatar, avatar.name);
      userService.saveAvatar(fd)
        .then(res => {
          setNotyficationText(t('settings:response.saveAvatar'))
          refreshUser()
        })
        .catch(e => {
          console.log(e);
          setNotyficationText(t('settings:error.saveAvatar'))
        })
    } else {
      setNotyficationText(t('settings:error.fileTooBig'))
    }
  }

  const deleteAvatar = () => {
    userService.deleteAvatar()
      .then(res => {
        setNotyficationText(t('settings:response.deleteAvatar'))
        refreshUser()
      })
      .catch(e => {
        console.log(e);
        setNotyficationText(t('settings:error.deleteAvatar'))
      })
  }

  const refreshUser = () => {
    setUserRefreshFlag(prevState => prevState + 1)
  }

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language)
  }

  return (
    <IconContext.Provider value={{ color: theme.palette.primary.main }}>
      <div className={styles.container}>
        <p className={styles.title}>{t('settings:title')}</p>

        <Button
          onClick={() => { changeSegment('EditUser') }}
          className={styles.showSegmentButton}>
          {t('settings:button.userSettings')}
          <IoIcons.IoIosArrowDown />
        </Button>

        {segment === 'EditUser' &&
          <div className={styles.inputContainer}>
            {userNameInput}
            {inGameNameInput}
            <RadioGroup className={styles.genderRadioContainer} value={gender} onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio color='primary' />} label={t('inputLabels:genderFemale')} />
              <FormControlLabel color='primary' value="male" control={<Radio color='primary' />} label={t('inputLabels:genderMale')} />
            </RadioGroup>
            <Button
              variant="outlined"
              color="primary"
              className={styles.button}
              onClick={editUser}>
              {t('buttons:save')}
            </Button>
            {notification}
          </div>
        }

        <MyHr customClass={styles.customHr} />

        <Button
          onClick={() => { changeSegment('EditPassword') }}
          className={styles.showSegmentButton}>
          {t('settings:button.passwordSettings')}
          <IoIcons.IoIosArrowDown />
        </Button>

        {segment === 'EditPassword' &&
          <div className={styles.inputContainer}>
            {oldPasswordInput}
            {newPasswordInput}
            {newRePasswordInput}
            <Button
              variant="outlined"
              color="primary"
              className={styles.button}
              onClick={editPassword}>
              {t('settings:button.savePassword')}
            </Button>
            {notification}
          </div>
        }

        <MyHr customClass={styles.customHr} />

        <Button
          onClick={() => { changeSegment('EditAvatar') }}
          className={styles.showSegmentButton}>
          {t('settings:button.avatarSettings')}
          <IoIcons.IoIosArrowDown />
        </Button>

        {segment === 'EditAvatar' &&
          <div className={styles.rowContainer}>
            <InputImage
              hasAvatar={userData.hasAvatar}
              saveAvatar={(avatar) => { saveAvatar(avatar) }}
              deleteAvatar={deleteAvatar} />
            {notification}
          </div>
        }

        <MyHr customClass={styles.customHr} />

        <Button
          onClick={() => { changeSegment('ChangeLanguage') }}
          className={styles.showSegmentButton}>
          {t('settings:button.languageSettings')}
          <IoIcons.IoIosArrowDown />
        </Button>

        {segment === 'ChangeLanguage' &&
          <div className={styles.rowContainer}>
            <Button
              id='languageButton'
              color='primary'
              variant="outlined"
              className={styles.button}
              onClick={() => handleLanguageChange('en')}>
              {t('settings:button.english')}
            </Button>
            <Button
              color='primary'
              variant="outlined"
              className={styles.button}
              onClick={() => handleLanguageChange('pl')}>
              {t('settings:button.polish')}
            </Button>
          </div>
        }
      </div>
    </IconContext.Provider>
  )
}

