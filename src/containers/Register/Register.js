import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, FormControlLabel, Radio, RadioGroup, useMediaQuery } from '@material-ui/core';
import authService from '../../api/authentication.api';
import useInput from '../../hooks/UseInput/useInput';
import val from '../../utils/ValidationUtil';
import { classes } from './Register.styles'

export default function Register() {
  const [inGameNameInput, inGameName, setInGameName] = useInput({ inputType: "text", inputLabel: "Ksywka", size: 'medium', color: 'secondary' });
  const [userNameInput, userName, setUserName] = useInput({ inputType: "text", inputLabel: "Nazwa użytkownika", size: 'medium', color: 'secondary' });
  const [emailInput, email, setEmail] = useInput({ inputType: "text", inputLabel: "Email", size: 'medium', color: 'secondary' });
  const [passwordInput, password, setPassword] = useInput({ inputType: "password", inputLabel: "Hasło", size: 'medium', color: 'secondary' });
  const [rePasswordInput, rePassword, setRePassword] = useInput({ inputType: "password", inputLabel: "Powtórz hasło", size: 'medium', color: 'secondary' });
  const [gender, setGender] = useState('male');
  const [error, setError] = useState('');
  const history = useHistory();
  const styles = classes();

  const mobile = useMediaQuery('(max-width:620px)');;

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const signUp = () => {
    if (val.signUp(inGameName, setInGameName, userName, setUserName, email, setEmail,
      password, setPassword, rePassword, setRePassword)) {

      const signUpRequest = {
        inGameName: `${capitalize(inGameName.value)}`,
        username: `${userName.value}`,
        email: `${email.value}`,
        userPassword: `${password.value}`,
        iconUrl: `${"none"}`,
        gender: `${gender}`
      };

      authService.signUp(signUpRequest)
        .then(resp => history.replace('/login'))
        .catch(e => setError(
          <div className={styles.errorBadCredentials}>
            {e.response.data.message}
          </div>
        ));
    }
  }

  const capitalize = (inGameName) => {
    if (typeof inGameName !== 'string') return ''
    return inGameName.charAt(0).toUpperCase() + inGameName.slice(1)
  }

  return (
    <div className={mobile ? styles.containerMobile : styles.containerDesktop}>
      <span className={styles.title}>Rejestracja</span>
      <div className={styles.container}>
        {inGameNameInput}
        {userNameInput}
        {emailInput}
        {passwordInput}
        {rePasswordInput}
        <RadioGroup className={styles.genderRadioContainer} aria-label="gender" name="gender1" value={gender} onChange={handleChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
        <Button
          variant="contained"
          color="secondary"
          className={styles.button}
          onClick={signUp}>
          Stwórz konto
        </Button>
        {error && error}
      </div>
    </div>
  );
}