import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { IconContext } from 'react-icons';
import Navbar from '../../Navbar/Navbar';
import SideMenu from '../../SideMenu/SideMenu';
import Home from '../../../prepPages/Home';
import Rooms from '../../Rooms/Rooms';
import History from '../../../prepPages/History';
import Settings from '../../../prepPages/Settings';
import { classes } from './MainLayoutMobile.styles'
import { roomClasses } from '../../Rooms/RoomsMobile.styles';

export default function MainLayoutMobile() {
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const toggleSideMenu = () => setSideMenuActive(!sideMenuActive);
  const closeSideMenu = () => setSideMenuActive(false);
  const history = useHistory();
  const styles = classes();

  useEffect(() => {
    history.replace('/rooms');
  }, []);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <Navbar toggleSideMenu={toggleSideMenu} />
        </div>
        <div className={styles.bottomContainer}>
          <div className={sideMenuActive ? styles.sideMenuEnabled : styles.sideMenuDisabled}>
            <SideMenu closeSideMenu={closeSideMenu} />
          </div>
          <div className={styles.contentContainer}>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/rooms">
              <Rooms roomClasses={roomClasses} mobile={true} />
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