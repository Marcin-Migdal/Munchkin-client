import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../api/authentication.api';
import useInput from '../../hooks/UseInput/useInput';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useMediaQuery } from '@material-ui/core';
import { classes } from './Login.styles'

export default function Login() {
  const [setLogin, login] = useInput({ inputType: 'text', inputLabel: "Login lub Email" });
  const [setPassword, password] = useInput({ inputType: 'password', inputLabel: "Hasło" });
  const [error, setError] = useState('');
  const history = useHistory();
  const styles = classes();
  
  const mobile = useMediaQuery('(max-width:620px)');;

  const validate = () => {
    if (!login.value) {
      login.setInputError(true);
      login.setErrorMessage('Podaj login');
      return false;
    }
    if (!password.value) {
      password.setInputError(true);
      password.setErrorMessage('Podaj Hasło');
      return false;
    }
    return true;
  };

  const signIn = () => {
    if (validate()) {
      const authorization = { usernameOrEmail: `${login.value}`, userPassword: `${password.value}` };
      authService.signIn(authorization)
        .then(resp => history.replace('/mainLayout'))
        .catch(e => setError(
          <div className={styles.errorBadCredentials}>
            Niepowodzenie podczas logowania!
            <br />
            Sprawdź poprawność loginu i hasła.
          </div>,
        ));
    }
  };

  return (
    <div className={mobile ? styles.containerMobile : styles.containerDesktop}>
      <span className={styles.title}>Logowanie</span>
      {setLogin}
      {setPassword}
      <ButtonComponent
        text={"Zaloguj się"}
        btnStyle={styles.button}
        variantStyle='contained'
        paletteColor='secondary'
        onClick={signIn} />
      {error && error}
    </div>
  );
}