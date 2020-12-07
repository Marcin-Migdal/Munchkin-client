import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import Navbar from '../../Navbar/Navbar';
import { classes } from './MainLayout.styles'

export default function MainLayout() {
  const [sideMenuActive, setSideMenuActive] = useState(true);
  const toggleSideMenu = () => setSideMenuActive(!sideMenuActive)
  const styles = classes();

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={styles.container}>
        <div className={styles.topContainer} >
          <Navbar toggleSideMenu={toggleSideMenu}/>
        </div>
        <div className={styles.bottomContainer}>
          <div className={sideMenuActive ? styles.LeftContainerEnabled : styles.LeftContainerDisabled}>

          </div>
          <div className={styles.rightContainer}>

          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}