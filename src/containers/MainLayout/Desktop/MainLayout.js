import React, { useState, Suspense, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { useTheme } from '@material-ui/core';
import { links } from '../../../utils/linkUtils';
import { homePageClasses } from '../../Home/Home.styles';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../../slices/currentUser';
import Navbar from '../../Navbar/Desktop/Navbar';
import SideMenu from '../../SideMenu/SideMenu';
import Home from '../../Home/Home';
import Rooms from '../../Rooms/Rooms';
import Settings from '../../Settings/Settings';
import Room from '../../Room/Room';
import RoomEdit from '../../RoomEdit/RoomEdit';
import SearchResult from '../../SearchResult/SearchResult';
import UserPage from '../../UserPage/UserPage';
import Game from '../../Game/Game';
import GameSummary from '../../GameSummary/GameSummary';
import FallbackLoading from '../../../components/FallbackLoading/FallbackLoading';
import { classes } from './MainLayout.styles'
import { roomsClasses } from '../../Rooms/Rooms.styles';
import { settingsClasses } from '../../Settings/Settings.styles';
import { roomClasses } from '../../Room/Room.styles';
import { roomEditClasses } from '../../RoomEdit/RoomEdit.styles';
import { SearchResultClasses } from '../../SearchResult/SearchResult.styles';
import { userPageClasses } from '../../UserPage/UserPage.styles';
import { gameClasses } from '../../Game/Game.styles';
import { gameSummaryClasses } from '../../GameSummary/GameSummary.styles';

export default function MainLayout() {
  const dispatch = useDispatch()
  const { t } = useTranslation(['menu']);
  const theme = useTheme();

  const [sideMenuActive, setSideMenuActive] = useState(true);

  const styles = classes();
  const mobile = false;

  const toggleSideMenu = () => setSideMenuActive(!sideMenuActive);

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch]);

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
          <Suspense fallback={<FallbackLoading />}>
            <div className={styles.contentContainer}>
              <Route path={links.home} render={(props) => <Home {...props} classes={homePageClasses} />} />
              <Route path={links.rooms} render={(props) => <Rooms  {...props} classes={roomsClasses} mobile={mobile} />} />
              <Route path={links.settings} render={(props) => <Settings {...props} classes={settingsClasses} mobile={mobile} />} />
              <Route path={links.room} render={(props) => <Room {...props} classes={roomClasses} mobile={mobile} />} />
              <Route path={links.roomEdit} render={(props) => <RoomEdit {...props} classes={roomEditClasses} />} />
              <Route path={links.searchResult} render={(props) => <SearchResult {...props} classes={SearchResultClasses} mobile={mobile} />} />
              <Route path={links.userPage} render={(props) => <UserPage {...props} classes={userPageClasses} sideMenuActive={sideMenuActive} mobile={mobile} />} />
              <Route path={links.game} render={(props) => <Game {...props} classes={gameClasses} mobile={mobile} />} />
              <Route path={links.gameSummary} render={(props) => <GameSummary {...props} classes={gameSummaryClasses} mobile={mobile} />} />
            </div>
          </Suspense>
        </div>
      </div>
    </IconContext.Provider>
  );
}
