import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import NavbarMobile from '../../Navbar/Mobile/NavbarMobile';
import SideMenu from '../../SideMenu/SideMenu';
import Home from '../../../prepPages/Home';
import Rooms from '../../Rooms/Rooms';
import History from '../../../prepPages/History';
import Settings from '../../Settings/Settings';
import RoomMenu from '../../RoomMenu/RoomMenu';
import RoomEdit from '../../RoomEdit/RoomEdit';
import SearchResult from '../../SearchResult/SearchResult';
import { classes } from './MainLayoutMobile.styles'
import { roomClasses } from '../../Rooms/RoomsMobile.styles';
import { settingsClasses } from '../../Settings/SettingsMobile.styles';
import { roomMenuClasses } from '../../RoomMenu/RoomMenuMobile.styles';
import { roomEditClasses } from '../../RoomEdit/RoomEditMobile.styles';
import { SearchResultClasses } from '../../SearchResult/SearchResultMobile.styles';

export default function MainLayoutMobile() {
  const [sideMenuActive, setSideMenuActive] = useState(false);
  const toggleSideMenu = () => setSideMenuActive(!sideMenuActive);
  const closeSideMenu = () => setSideMenuActive(false);
  const styles = classes();
  const mobile = true;

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <NavbarMobile toggleSideMenu={toggleSideMenu} mobile={mobile} sideMenuActive={sideMenuActive} />
        </div>
        <div className={styles.bottomContainer}>
          <div className={sideMenuActive ? styles.sideMenuEnabled : styles.sideMenuDisabled}>
            <SideMenu closeSideMenu={closeSideMenu} mobile={mobile} />
          </div>
          <div className={styles.contentContainer}>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/rooms">
              <Rooms classes={roomClasses} mobile={mobile} />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/settings">
              <Settings classes={settingsClasses} />
            </Route>
            <Route path="/room">
              <RoomMenu classes={roomMenuClasses} mobile={mobile} />
            </Route>
            <Route path="/editRoom">
              <RoomEdit classes={roomEditClasses} />
            </Route>
            <Route path="/searchResult">
              <SearchResult classes={SearchResultClasses} mobile={mobile} />
            </Route>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}