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

export default function Settings({ classes }) {
  const theme = useTheme();
  const styles = classes();

  const [userRefreshFlag, setUserRefreshFlag] = useState(0);
  const [userData] = useFetchGet({ url: '/api/auth/user', reloadFlag: userRefreshFlag });

  const [userNameInput, userName, setUserName] = useInput({ inputType: "text", inputLabel: "Nazwa użytkownika", size: 'small', color: 'primary', customClasses: styles.input });
  const [inGameNameInput, inGameName, setInGameName] = useInput({ inputType: "text", inputLabel: "Ksywka", size: 'small', color: 'primary', customClasses: styles.input });

  const [oldPasswordInput, oldPassword, setOldPassword] = useInput({ inputType: "password", inputLabel: "Stare Hasło", size: 'small', color: 'primary', customClasses: styles.input });
  const [newPasswordInput, newPassword, setNewPassword] = useInput({ inputType: "password", inputLabel: "Nowe Hasło", size: 'small', color: 'primary', customClasses: styles.input });
  const [newRePasswordInput, newRePassword, setNewRePassword] = useInput({ inputType: "password", inputLabel: "Powtórz Hasło", size: 'small', color: 'primary', customClasses: styles.input });
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

    if (val.editUserRequest(editUserRequest, setUserName, setInGameName)) {
      userService.editUser(editUserRequest)
        .then(resp => {
          setNotyficationText('Edycja użytkownika powiodła sie')
        })
        .catch(e => {
          if (e.response && e.response.status === 400) {
            setNotyficationText(e.response.data.message)
          } else {
            setNotyficationText('Przy edycji użytkownika wystąpił błąd')
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

    if (val.editUserPasswordRequest(editUserPasswordRequest, setOldPassword, setNewPassword, setNewRePassword)) {
      userService.editUserPassword(editUserPasswordRequest)
        .then(resp => {
          setNotyficationText('Edycja hasła powiodła sie')
        })
        .catch(e => {
          console.log(e)
          if (e.response && e.response.data.status === 401) {
            setNotyficationText('Stare hasło jest nie poprawne')
          } else {
            setNotyficationText('Wystąpił błąd przy zmianie hasła')
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
    if(avatar.size < 500000){
      const fd = new FormData();
      fd.append('image', avatar, avatar.name);
      userService.saveAvatar(fd)
        .then(res => {
          setNotyficationText('Avatar został zapisany')
          refreshUser()
        })
        .catch(e => {
          console.log(e);
          setNotyficationText('Przy zapisywaniu avatara wystąpił błąd')
        })
    }else{
      setNotyficationText('Wybrany plik jest za duży, maksymalny rozmiar pliku to 500kb')
    }
  }

  const deleteAvatar = () => {
    userService.deleteAvatar(userData.id)
      .then(res => {
        setNotyficationText('Avatar został usunięty')
        refreshUser()
      })
      .catch(e => {
        console.log(e);
        setNotyficationText('Przy usuwaniu avatara wystąpił błąd')
      })
  }

  const refreshUser = () => {
    setUserRefreshFlag(prevState => prevState + 1)
  }

  return (
    <IconContext.Provider value={{ color: theme.palette.primary.main }}>
      <div className={styles.container}>
        <p className={styles.title}>Ustawienia</p>

        <Button
          onClick={() => { changeSegment('EditUser') }}
          className={styles.showSegmentButton}>
          Edycja użytkownika
          <IoIcons.IoIosArrowDown />
        </Button>

        {segment === 'EditUser' &&
          <div className={styles.inputContainer}>
            {userNameInput}
            {inGameNameInput}
            <RadioGroup className={styles.genderRadioContainer} aria-label="gender" name="gender1" value={gender} onChange={handleChange}>
              <FormControlLabel value="female" control={<Radio color='primary' />} label="Female" />
              <FormControlLabel color='primary' value="male" control={<Radio color='primary' />} label="Male" />
            </RadioGroup>
            <Button
              variant="outlined"
              color="primary"
              className={styles.button}
              onClick={editUser}>
              Zapisz
            </Button>
            {notification}
          </div>
        }

        <MyHr customClass={styles.customHr} />

        <Button
          onClick={() => { changeSegment('EditPassword') }}
          className={styles.showSegmentButton}>
          Zmiana hasła
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
              Zmień hasło
            </Button>
            {notification}
          </div>
        }

        <MyHr customClass={styles.customHr} />

        <Button
          onClick={() => { changeSegment('EditAvatar') }}
          className={styles.showSegmentButton}>
          Ustawienia Avataru
          <IoIcons.IoIosArrowDown />
        </Button>

        {segment === 'EditAvatar' &&
          <div className={styles.avatarContainer}>
            <InputImage
              hasAvatar={userData.hasAvatar}
              saveAvatar={(avatar) => { saveAvatar(avatar) }}
              deleteAvatar={deleteAvatar} />
            {notification}
          </div>
        }
      </div>
    </IconContext.Provider>
  )
}

