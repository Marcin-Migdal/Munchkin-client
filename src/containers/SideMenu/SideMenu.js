import React, { useState } from 'react'
import * as AiIcons from "react-icons/ai"
import * as BiIcons from "react-icons/bi"
import authenticationService from '../../api/authentication.api';
import ListComponent from '../../components/ListComponent/ListComponent';
import SideMenuButton from '../../components/SideMenuButton/SideMenuButton';
import { SideMenuData } from '../../utils/SideMenuUtils';
import MyHr from '../../components/MyHr/MyHr';
import { classes } from '../../components/SideMenuButton/SideMenuButton.styles';
import { mobileClasses } from '../../components/SideMenuButton/SideMenuButtonMobile.styles';
import { useHistory, useLocation } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import playerStatusService from '../../api/playerStatus.api';
import { links } from '../../utils/linkUtils';

export default function SideMenu({ closeSideMenu, mobile }) {
  const [modal, setModal] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const styles = mobile ? mobileClasses : classes;

  const showExitModal = (path) => {
    setModal(
      <ConfirmationModal
        text='Czy na pewno chcesz wyjśc z gry ?'
        mobile={mobile}
        onClickYes={() => { leaveRoom(path) }}
        onClickNo={() => { setModal() }} />
    )
    mobile && closeSideMenu()
  }

  const leaveRoom = (path) => {
    setModal()
    playerStatusService.leaveRoom(location.state.roomId)
      .then(() => {
        history.replace(path)
      })
  }

  const showSignOutModal = () => {
    setModal(
      <ConfirmationModal
        text='Czy na pewno chcesz się wylogować ?'
        mobile={mobile}
        onClickYes={() => { signOut() }}
        onClickNo={() => { setModal() }} />
    )
    mobile && closeSideMenu()
  }

  const signOut = () => {
    setModal()
    authenticationService.signOut();
  }

  const SignOutButton = () => {
    return (
      location.pathname === links.game ?
        <SideMenuButton
          path={links.rooms}
          icon={<BiIcons.BiArrowBack />}
          text='Wróć'
          classes={styles}
          onClick={(path) => { showExitModal(path) }}
        /> :
        <SideMenuButton
          icon={<AiIcons.AiOutlineLogout />}
          text='Wyloguj'
          classes={styles}
          onClick={() => { showSignOutModal() }} />
    )
  }

  return (
    <div>
      <MyHr />
      <ul>
        <ListComponent data={SideMenuData} mapFunction={(item, index) => {
          return (
            <li key={index} onClick={closeSideMenu}>
              <SideMenuButton
                path={item.path}
                icon={item.icon}
                text={item.page}
                classes={styles}
                onClick={(path) => { showExitModal(path) }} />
            </li>
          )
        }} />
        <SignOutButton />
      </ul>
      {modal && modal}
    </div>
  )
}
