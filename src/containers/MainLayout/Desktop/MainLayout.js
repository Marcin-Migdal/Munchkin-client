import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { IconContext } from 'react-icons';
import Navbar from '../../Navbar/Desktop/Navbar';
import SideMenu from '../../SideMenu/SideMenu';
import Home from '../../../prepPages/Home';
import Rooms from '../../Rooms/Rooms';
import History from '../../../prepPages/History';
import Settings from '../../Settings/Settings';
import SelectRoom from '../../SelectRoom/SelectRoom';
import { classes } from './MainLayout.styles'
import { roomClasses } from '../../Rooms/Rooms.styles';
import { settingsClasses } from '../../Settings/Settings.styles';

export default function MainLayout() {
  const [sideMenuActive, setSideMenuActive] = useState(true);
  const toggleSideMenu = () => setSideMenuActive(!sideMenuActive);
  const history = useHistory();
  const styles = classes();
  const mobile = false;

  useEffect(() => {
    history.replace('/rooms');
  }, []);

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={styles.container}>
        <div className={styles.topContainer} >
          <Navbar toggleSideMenu={toggleSideMenu} mobile={mobile} />
        </div>
        <div className={styles.bottomConteinerSideMenu}>
          <div className={sideMenuActive ? styles.sideMenuConteinerEnabled : styles.sideMenuConteinerDisabled}>
            <SideMenu mobile={mobile} />
          </div>
          <div className={styles.contentConteiner}>
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
              <Settings settingsClasses={settingsClasses}/>
            </Route>
            <Route path="/room">
              <SelectRoom/>
            </Route>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}