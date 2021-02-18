import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';

export default function WelcomePage({ classes }) {
  const { t } = useTranslation(['auth', 'inputLabels']);

  const styles = classes();

  useEffect(() => {
    return function cleanUp() {
      localStorage.removeItem('tokenExpired')
    }
  }, []);

  return (
    <div className={styles.backgroundLayer}>
      <p className={styles.title}>Munchkin</p>
      <div className={styles.container}>
        <span className={styles.description}>{t('auth:welcomePage.description')}</span>
        <div className={styles.buttonContainer}>
          <Button
            component={Link}
            to={links.login}
            variant="contained"
            color="secondary"
            className={styles.button}>
            {t('auth:buttons.signIn')}
          </Button>
          <Button
            component={Link}
            to={links.register}
            variant="contained"
            color="secondary"
            className={styles.button}>
            {t('auth:buttons.signUp')}
          </Button>
        </div>
        {localStorage.getItem('tokenExpired') &&
          <div>
            <p className={styles.sesionExpiredText}>{t('auth:welcomePage.sesionExpired')}</p>
          </div>
        }
      </div>
    </div>
  )
}