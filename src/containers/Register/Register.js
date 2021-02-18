import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, FormControlLabel, Radio, RadioGroup, useMediaQuery } from '@material-ui/core';
import authService from '../../api/authentication.api';
import useInput from '../../hooks/UseInput/useInput';
import val from '../../utils/ValidationUtil';
import { classes } from './Register.styles'
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t } = useTranslation(['auth', 'inputLabels']);
  const history = useHistory();

  const [inGameNameInput, inGameName, setInGameName] = useInput({
    inputType: "text",
    inputLabel: t('inputLabels:inGameName'),
    size: 'medium',
    color: 'secondary'
  });
  const [userNameInput, userName, setUserName] = useInput({
    inputType: "text",
    inputLabel: t('inputLabels:username'),
    size: 'medium',
    color: 'secondary'
  });
  const [emailInput, email, setEmail] = useInput({
    inputType: "text",
    inputLabel: t('inputLabels:email'),
    size: 'medium',
    color: 'secondary'
  });
  const [passwordInput, password, setPassword] = useInput({
    inputType: "password",
    inputLabel: t('inputLabels:password'),
    size: 'medium',
    color: 'secondary'
  });
  const [rePasswordInput, rePassword, setRePassword] = useInput({
    inputType: "password",
    inputLabel: t('inputLabels:rePassword'),
    size: 'medium',
    color: 'secondary'
  });

  const [gender, setGender] = useState('male');
  const [error, setError] = useState('');

  const styles = classes();

  const mobile = useMediaQuery('(max-width:620px)');;

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const signUp = () => {
    if (val.signUp(inGameName, setInGameName, userName, setUserName, email, setEmail,
      password, setPassword, rePassword, setRePassword, t)) {

      const signUpRequest = {
        inGameName: `${capitalize(inGameName.value)}`,
        username: `${userName.value}`,
        email: `${email.value}`,
        userPassword: `${password.value}`,
        iconUrl: `${"none"}`,
        gender: `${gender}`
      };

      authService.signUp(signUpRequest)
        .then(resp => history.replace(links.login))
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
      <span className={styles.title}>{t('auth:signUp.title')}</span>
      <div className={styles.container}>
        {inGameNameInput}
        {userNameInput}
        {emailInput}
        {passwordInput}
        {rePasswordInput}
        <RadioGroup className={styles.genderRadioContainer} value={gender} onChange={handleChange}>
          <FormControlLabel
            value="female"
            control={<Radio />}
            label={t('inputLabels:genderFemale')} />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label={t('inputLabels:genderMale')} />
        </RadioGroup>
        <Button
          variant="contained"
          color="secondary"
          className={styles.button}
          onClick={signUp}>
          {t('auth:buttons.signUp')}
        </Button>
        {error && error}
      </div>
    </div>
  );
}