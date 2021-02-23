import React, { useState, Suspense, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { IconContext } from 'react-icons';
import NavbarMobile from '../../Navbar/Mobile/NavbarMobile';
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
import { classes } from './MainLayoutMobile.styles'
import { roomsClasses } from '../../Rooms/RoomsMobile.styles';
import { settingsClasses } from '../../Settings/SettingsMobile.styles';
import { roomClasses } from '../../Room/RoomMobile.styles';
import { roomEditClasses } from '../../RoomEdit/RoomEditMobile.styles';
import { SearchResultClasses } from '../../SearchResult/SearchResultMobile.styles';
import { userPageClasses } from '../../UserPage/UserPageMobile.styles';
import { gameClasses } from '../../Game/GameMobile.styles';
import { gameSummaryClasses } from '../../GameSummary/GameSummaryMobile.styles';
import { useTheme } from '@material-ui/core';
import { links } from '../../../utils/linkUtils';
import { homePageClasses } from '../../Home/HomeMobile.styles';
import { useTranslation } from 'react-i18next';
import FallbackLoading from '../../../components/FallbackLoading/FallbackLoading';
import { useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../../slices/currentUser';

export default function MainLayoutMobile() {
  const dispatch = useDispatch()
  const { t } = useTranslation(['menu']);
  const theme = useTheme();

  const [sideMenuActive, setSideMenuActive] = useState(false);

  const styles = classes();
  const mobile = true;

  const toggleSideMenu = () => setSideMenuActive(!sideMenuActive);
  const closeSideMenu = () => setSideMenuActive(false);

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch]);

  return (
    <IconContext.Provider value={{ color: theme.palette.secondary.main }}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          <NavbarMobile toggleSideMenu={toggleSideMenu} mobile={mobile} sideMenuActive={sideMenuActive} />
        </div>
        <div className={styles.bottomContainer}>
          <div className={sideMenuActive ? styles.sideMenuEnabled : styles.sideMenuDisabled}>
            <SideMenu closeSideMenu={closeSideMenu} mobile={mobile} />
          </div>
          <Suspense fallback={<FallbackLoading />}>
            <div className={styles.contentContainer}>
              <Route path={links.home} render={(props) => <Home {...props} classes={homePageClasses} />} />
              <Route path={links.rooms} render={(props) => <Rooms {...props} classes={roomsClasses} mobile={mobile} />} />
              <Route path={links.settings} render={(props) => <Settings {...props} classes={settingsClasses} mobile={mobile} />} />
              <Route path={links.room} render={(props) => <Room {...props} classes={roomClasses} mobile={mobile} />} />
              <Route path={links.roomEdit} render={(props) => <RoomEdit {...props} classes={roomEditClasses} />} />
              <Route path={links.searchResult} render={(props) => <SearchResult {...props} classes={SearchResultClasses} mobile={mobile} />} />
              <Route path={links.userPage} render={(props) => <UserPage {...props} classes={userPageClasses} mobile={mobile} />} />
              <Route path={links.game} render={(props) => <Game {...props} classes={gameClasses} mobile={mobile} />} />
              <Route path={links.gameSummary} render={(props) => <GameSummary {...props} classes={gameSummaryClasses} mobile={mobile} />} />
            </div>
          </Suspense>
        </div>
      </div>
    </IconContext.Provider>
  );
}