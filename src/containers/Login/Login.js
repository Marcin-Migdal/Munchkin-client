import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../api/authentication.api';
import useInput from '../../hooks/UseInput/useInput';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useMediaQuery } from '@material-ui/core';
import val from '../../utils/ValidationUtil';
import { classes } from './Login.styles'

export default function Login() {
  const [loginInput, login, setLogin] = useInput({ inputType: 'text', inputLabel: "Login lub Email" });
  const [passwordInput, password, setPassword] = useInput({ inputType: 'password', inputLabel: "Hasło" });
  const [error, setError] = useState('');
  const history = useHistory();
  const styles = classes();

  const mobile = useMediaQuery('(max-width:620px)');;

  const signIn = () => {
    if (val.signIn(login.value, setLogin, password.value, setPassword)) {
      const authorization = { usernameOrEmail: `${login.value}`, userPassword: `${password.value}` };
      authService.signIn(authorization)
        .then(resp => history.replace('/home'))
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
      {loginInput}
      {passwordInput}
      <ButtonComponent
        text='Zaloguj się'
        btnStyle={styles.button}
        variantStyle='contained'
        paletteColor='secondary'
        action={signIn} />
      {error && error}
    </div>
  );
}