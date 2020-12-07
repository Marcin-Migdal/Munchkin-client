import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { classes } from './MainLayoutMobile.styles'

export default function MainLayoutMobile() {
  const [sideMenuActive, setSideMenuActive] = useState(true);
  const toggleSideMenu = () => setSideMenuActive(!sideMenuActive)
  const styles = classes();

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={styles.container}>
        <div className={styles.topContainer} onClick={toggleSideMenu}>

        </div>
        <div className={styles.bottomContainer}>
          <div className={sideMenuActive ? styles.sideMenuEnabled : styles.sideMenuDisabled}>

          </div>
          <div className={styles.contentContainer}>

          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}