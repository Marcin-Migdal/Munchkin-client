import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import Navbar from '../../Navbar/Navbar';
import SideMenu from '../../SideMenu/SideMenu';
import Home from '../../../prepPages/Home';
import Rooms from '../../Rooms/Rooms';
import History from '../../../prepPages/History';
import Settings from '../../../prepPages/Settings';
import { classes } from './MainLayoutMobile.styles'
import { sideMenuClasses } from '../../SideMenu/SideMenuMobile.styles'
import { Route, useHistory } from 'react-router-dom';

export default function MainLayoutMobile() {
  const [sideMenuActive, setSideMenuActive] = useState(true);
  const toggleSideMenu = () => setSideMenuActive(!sideMenuActive);
  const closeSideMenu = () => setSideMenuActive(false);
  const history = useHistory();
  const styles = classes();

  useEffect(() => {
    history.replace('/home');
  }, []);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <Navbar toggleSideMenu={toggleSideMenu} />
        </div>
        <div className={styles.bottomContainer}>
          <div className={sideMenuActive ? styles.sideMenuEnabled : styles.sideMenuDisabled}>
            <SideMenu
              sideMenuActive={sideMenuActive}
              closeSideMenu={closeSideMenu}
              classes={sideMenuClasses} />
          </div>
          <div className={styles.contentContainer}>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/rooms">
              <Rooms />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}