import React, { useEffect } from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent';

export default function DefaultPage({ classes }) {
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
          <ButtonComponent
            url="/login"
            text="Logowanie"
            btnStyle={styles.button}
            variantStyle='contained'
            paletteColor='secondary' />
          <ButtonComponent
            url="/register"
            text="Rejestracja"
            btnStyle={styles.button}
            variantStyle='contained'
            paletteColor='secondary' />
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