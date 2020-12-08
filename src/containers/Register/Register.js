import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../api/authentication.api';
import { FormControlLabel, Radio, RadioGroup, useMediaQuery } from '@material-ui/core';
import SignUpValidation from '../../utils/SignUpValidation';
import useInput from '../../hooks/UseInput/useInput';
import { classes } from './Register.styles'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

export default function Register() {
  const [setInGameName, inGameName] = useInput({ inputType: "text", inputLabel: "Ksywka" });
  const [setUserName, userName] = useInput({ inputType: "text", inputLabel: "Login" });
  const [setEmail, email] = useInput({ inputType: "text", inputLabel: "Email" });
  const [setPassword, password] = useInput({ inputType: "password", inputLabel: "Hasło" });
  const [setRePassword, rePassword] = useInput({ inputType: "password", inputLabel: "Powtórz hasło" });
  const [gender, setGender] = useState('male');
  const [error, setError] = useState('');
  const history = useHistory();
  const styles = classes();

  const mobile = useMediaQuery('(max-width:620px)');;

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const signUp = () => {
    if (SignUpValidation(inGameName, userName, email, password, rePassword)) {
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
        {setInGameName}
        {setUserName}
        {setEmail}
        {setPassword}
        {setRePassword}
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