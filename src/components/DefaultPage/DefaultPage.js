import React from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent';

export default function DefaultPage({classes}) {
  const styles = classes();

  return (
    <div className={styles.backgroundLayer}>
      <span className={styles.title}>Munchkin</span>
      <div className={styles.container}>
        <span className={styles.description}>Uprość swoją rozgrywkę w grze karcianej Munchkin dzieki zapisywaniu postępu swojej postaci oraz możliwości natychmiastowego sprawdzania postępu swoich przeciwników</span>
        <div>
          <ButtonComponent
            to="/login"
            text="Logowanie"
            btnStyle={styles.button}
            variantStyle='contained'
            paletteColor='secondary' />
          <ButtonComponent
            to="/register"
            text="Rejestracja"
            btnStyle={styles.button}
            variantStyle='contained'
            paletteColor='secondary' />
        </div>
      </div>
    </div>
  )
}