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
import SearchResult from '../../SearchResult/SearchResult';
import { classes } from './MainLayout.styles'
import { roomClasses } from '../../Rooms/Rooms.styles';
import { settingsClasses } from '../../Settings/Settings.styles';
import { roomMenuClasses } from '../../RoomMenu/RoomMenu.styles';
import { roomEditClasses } from '../../RoomEdit/RoomEdit.styles';
import { SearchResultClasses } from '../../SearchResult/SearchResult.styles';

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
            <Route path="/SearchResult">
              <SearchResult classes={SearchResultClasses} mobile={mobile} />
            </Route>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
