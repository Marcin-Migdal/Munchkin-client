import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { links } from '../../utils/linkUtils';

export default function WelcomePage({ classes }) {
  const styles = classes();

  useEffect(() => { 
    return function cleanUp() {
      localStorage.removeItem('tokenExpired')
    }
  }, []);

  return (
    <div className={styles.backgroundLayer}>
      <span className={styles.title}>Munchkin</span>
      <div className={styles.container}>
        <span className={styles.description}>Uprość swoją rozgrywkę w grze karcianej Munchkin dzieki zapisywaniu postępu swojej postaci oraz możliwości natychmiastowego sprawdzania postępu swoich przeciwników</span>
        <div className={styles.buttonContainer}>
          <Button
            component={Link}
            to={links.login}
            variant="contained"
            color="secondary"
            className={styles.button}>
            Logowanie
          </Button>
          <Button
            component={Link}
            to={links.register}
            variant="contained"
            color="secondary"
            className={styles.button}>
            Rejestracja
          </Button>
        </div>
        {localStorage.getItem('tokenExpired') &&
          <div>
            <p className={styles.sesionExpiredText}>Czas sesji się skończył</p>
            <p className={styles.sesionExpiredText}>proszę zalogować się ponownie</p>
          </div>}
      </div>
    </div>
  )
}