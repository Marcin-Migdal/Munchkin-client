import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormControlLabel, Radio, RadioGroup, useMediaQuery } from '@material-ui/core';
import authService from '../../api/authentication.api';
import useInput from '../../hooks/UseInput/useInput';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import val from '../../utils/ValidationUtil';
import { classes } from './Register.styles'

export default function Register() {
  const [inGameNameInput, inGameName, setInGameName] = useInput({ inputType: "text", inputLabel: "Ksywka" });
  const [userNameInput, userName, setUserName] = useInput({ inputType: "text", inputLabel: "Login" });
  const [emailInput, email, setEmail] = useInput({ inputType: "text", inputLabel: "Email" });
  const [passwordInput, password, setPassword] = useInput({ inputType: "password", inputLabel: "Hasło" });
  const [rePasswordInput, rePassword, setRePassword] = useInput({ inputType: "password", inputLabel: "Powtórz hasło" });
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
        inGameName: `${inGameName.value}`,
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

  return (
    <div className={mobile ? styles.containerMobile : styles.containerDesktop}>
      <span className={styles.title}>Rejestracja</span>
      <div className={styles.container}>
        {inGameNameInput}
        {userNameInput}
        {emailInput}
        {passwordInput}
        {rePasswordInput}
        <RadioGroup className={styles.genderRadioContener} aria-label="gender" name="gender1" value={gender} onChange={handleChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
        <ButtonComponent
          text='Stwórz konto'
          btnStyle={styles.button}
          variantStyle='contained'
          paletteColor='secondary'
          action={signUp} />
        {error && error}
      </div>
    </div>
  );
}