import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import Navbar from '../../Navbar/Desktop/Navbar';
import SideMenu from '../../SideMenu/SideMenu';
import Home from '../../../prepPages/Home';
import Rooms from '../../Rooms/Rooms';
import History from '../../../prepPages/History';
import Settings from '../../Settings/Settings';
import RoomMenu from '../../RoomMenu/RoomMenu';
import RoomEdit from '../../RoomEdit/RoomEdit';
import { classes } from './MainLayout.styles'
import { roomClasses } from '../../Rooms/Rooms.styles';
import { settingsClasses } from '../../Settings/Settings.styles';
import { roomMenuClasses } from '../../RoomMenu/RoomMenu.styles';
import { roomEditClasses } from '../../RoomEdit/RoomEdit.styles';

export default function MainLayout() {
  const [sideMenuActive, setSideMenuActive] = useState(true);
  const toggleSideMenu = () => setSideMenuActive(!sideMenuActive);
  const styles = classes();
  const mobile = false;
  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={styles.container}>
        <div className={styles.topContainer} >
          <Navbar toggleSideMenu={toggleSideMenu} mobile={mobile} />
        </div>
        <div className={styles.bottomContainerSideMenu}>
          <div className={sideMenuActive ? styles.sideMenuContainerEnabled : styles.sideMenuContainerDisabled}>
            <SideMenu mobile={mobile} />
          </div>
          <div className={styles.contentContainer}>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/rooms">
              <Rooms roomClasses={roomClasses} mobile={mobile} />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/settings">
              <Settings settingsClasses={settingsClasses} />
            </Route>
            <Route path="/room">
              <RoomMenu mobile={mobile} classes={roomMenuClasses} />
            </Route>
            <Route path="/editRoom">
              <RoomEdit mobile={mobile} classes={roomEditClasses} />
            </Route>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
