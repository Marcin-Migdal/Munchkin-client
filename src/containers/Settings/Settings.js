import { Button, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
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
  const styles = classes();
  
  const [userData] = useFetchGet({ url: '/api/auth/user' });

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
          setNotification(
            <div className={styles.notificationText}>
              Edycja użytkownika powiodła sie
            </div>
          )
        })
        .catch(e => {
          console.log(e)
          setNotification(
            <div className={styles.notificationText}>
              Przy edycji użytkownika wystąpił błąd
            </div>
          )
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
          setNotification(
            <div className={styles.notificationText}>
              Edycja hasła powiodła sie
            </div>
          )
        })
        .catch(e => {
          console.log(e)
          setNotyficationText('Wystąpił błąd przy zmianie hasła')
          if (e.response) {
            if (e.response.data.status === 401) {
              setNotyficationText('Stare hasło jest nie poprawne')
            }else {
              setNotyficationText('Wystąpił błąd przy zmianie hasła')
            }
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

  return (
    <IconContext.Provider value={{ color: '#ffcc00' }}>
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
          Zmiana Avataru
          <IoIcons.IoIosArrowDown />
        </Button>

        {segment === 'EditAvatar' &&
          <div className={styles.avatarContainer}><InputImage />
            {notification}</div>
        }
      </div>
    </IconContext.Provider>
  )
}

