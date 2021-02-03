import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../api/authentication.api';
import useInput from '../../hooks/UseInput/useInput';
import { Button, useMediaQuery } from '@material-ui/core';
import val from '../../utils/ValidationUtil';
import { classes } from './Login.styles'
import { links } from '../../utils/linkUtils';

export default function Login() {
  const [userNameInput, userName, setNserName] = useInput({ inputType: 'text', inputLabel: "Nazwa użytkownika lub Email", size: 'medium', color: 'secondary' });
  const [passwordInput, password, setPassword] = useInput({ inputType: 'password', inputLabel: "Hasło", size: 'medium', color: 'secondary' });
  const [error, setError] = useState('');
  const history = useHistory();
  const styles = classes();

  const mobile = useMediaQuery('(max-width:620px)');;

  const signIn = () => {
    if (val.signIn(userName.value, setNserName, password.value, setPassword)) {
      const authorization = { usernameOrEmail: `${userName.value}`, userPassword: `${password.value}` };
      authService.signIn(authorization)
        .then(resp => history.replace(links.home))
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
      {userNameInput}
      {passwordInput}
      <Button
        variant="contained"
        color="secondary"
        className={styles.button}
        onClick={signIn}>
        Zaloguj się
      </Button>
      {error && error}
    </div>
  );
}