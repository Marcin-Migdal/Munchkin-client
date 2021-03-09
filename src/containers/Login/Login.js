import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../../api/authentication.api';
import useInput from '../../hooks/UseInput/useInput';
import { Button, useMediaQuery } from '@material-ui/core';
import val from '../../utils/ValidationUtil';
import { classes } from './Login.styles'
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';
import playerStatusService from '../../api/playerStatus.api';

export default function Login() {
  const { t } = useTranslation(['auth', 'inputLabels']);
  const history = useHistory();

  const [error, setError] = useState('');

  const [userNameInput, userName, setNserName] = useInput({
    inputType: 'text',
    inputLabel: t('auth:signIn.inputLabelUsername'),
    size: 'medium',
    color: 'secondary'
  });
  const [passwordInput, password, setPassword] = useInput({
    inputType: 'password',
    inputLabel: t('inputLabels:password'),
    size: 'medium',
    color: 'secondary'
  });

  const styles = classes();
  const mobile = useMediaQuery('(max-width:620px)');;

  const signIn = () => {
    if (val.signIn(userName.value, setNserName, password.value, setPassword, t)) {
      const authorization = { usernameOrEmail: `${userName.value}`, userPassword: `${password.value}` };
      authService.signIn(authorization)
        .then(resp => {
          playerStatusService.leaveRoomOnLogIn()
          history.replace(links.home)
        })
        .catch(e => setError(
          <div className={styles.errorBadCredentials}>
            {t('auth:signIn.errorPart1')}
            <br />
            {t('auth:signIn.errorPart2')}
          </div>,
        ));
    }
  };

  return (
    <div className={mobile ? styles.containerMobile : styles.containerDesktop}>
      <span className={styles.title}>{t('auth:signIn.title')}</span>
      {userNameInput}
      {passwordInput}
      <Button
        variant="contained"
        color="secondary"
        className={styles.button}
        onClick={signIn}>
        {t('auth:buttons.signIn')}
      </Button>
      {error && error}
    </div>
  );
}