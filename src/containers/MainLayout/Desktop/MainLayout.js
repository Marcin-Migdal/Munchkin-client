import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import Navbar from '../../Navbar/Desktop/Navbar';
import SideMenu from '../../SideMenu/SideMenu';
import Home from '../../../prepPages/Home';
import Rooms from '../../Rooms/Rooms';
import Settings from '../../Settings/Settings';
import Room from '../../Room/Room';
import RoomEdit from '../../RoomEdit/RoomEdit';
import SearchResult from '../../SearchResult/SearchResult';
import UserPage from '../../UserPage/UserPage';
import Game from '../../Game/Game';
import GameSummary from '../../GameSummary/GameSummary';
import { classes } from './MainLayout.styles'
import { roomsClasses } from '../../Rooms/Rooms.styles';
import { settingsClasses } from '../../Settings/Settings.styles';
import { roomClasses } from '../../Room/Room.styles';
import { roomEditClasses } from '../../RoomEdit/RoomEdit.styles';
import { SearchResultClasses } from '../../SearchResult/SearchResult.styles';
import { userPageClasses } from '../../UserPage/UserPage.styles';
import { gameClasses } from '../../Game/Game.styles';
import { gameSummaryClasses } from '../../GameSummary/GameSummary.styles';
import { useTheme } from '@material-ui/core';

export default function MainLayout() {
  const theme = useTheme();
  const [sideMenuActive, setSideMenuActive] = useState(true);
  const toggleSideMenu = () => setSideMenuActive(!sideMenuActive);
  const styles = classes();
  const mobile = false;
  return (
    <IconContext.Provider value={{ color: theme.palette.secondary.main }}>
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
              <Rooms classes={roomsClasses} mobile={mobile} />
            </Route>
            <Route path="/settings">
              <Settings classes={settingsClasses} />
            </Route>
            <Route path="/room">
              <Room classes={roomClasses} mobile={mobile} />
            </Route>
            <Route path="/editRoom">
              <RoomEdit classes={roomEditClasses} />
            </Route>
            <Route path="/SearchResult">
              <SearchResult classes={SearchResultClasses} mobile={mobile} />
            </Route>
            <Route path="/user">
              <UserPage classes={userPageClasses} sideMenuActive={sideMenuActive} mobile={mobile} />
            </Route>
            <Route path="/game">
              <Game classes={gameClasses} mobile={mobile} />
            </Route>
            <Route path="/gameSummary">
              <GameSummary classes={gameSummaryClasses} mobile={mobile} />
            </Route>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
