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
import { useTranslation } from 'react-i18next';
import { layoutSelector } from '../../slices/layout';
import { useSelector } from 'react-redux';

export default function SideMenu({ closeSideMenu, style }) {
  const { t } = useTranslation(['buttons']);
  const location = useLocation();
  const history = useHistory();

  const { layout } = useSelector(layoutSelector)
  const [modal, setModal] = useState(false);

  const styles = layout.mobile ? mobileClasses : classes;

  const showExitModal = (path) => {
    setModal(
      <ConfirmationModal
        text={t('menu:sideMenu.modal.exitRoom')}
        onClickYes={() => leaveRoom(path)}
        onClickNo={() => setModal()} />
    )
    layout.mobile && closeSideMenu()
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
        text={t('menu:sideMenu.modal.signOut')}
        onClickYes={() => signOut()}
        onClickNo={() => setModal()} />
    )
    layout.mobile && closeSideMenu()
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
          text={t('buttons:back')}
          classes={styles}
          onClick={path => showExitModal(path)}
        /> :
        <SideMenuButton
          icon={<AiIcons.AiOutlineLogout />}
          text={t('menu:sideMenu.button.signOut')}
          classes={styles}
          onClick={showSignOutModal} />
    )
  }

  return (
    <div className={style}>
      <MyHr />
      <ul>
        <ListComponent data={SideMenuData} mapFunction={(item, index) => {
          return (
            <li key={index} onClick={closeSideMenu}>
              <SideMenuButton
                path={item.path}
                icon={item.icon}
                text={t('menu:sideMenu.button.' + item.page)}
                classes={styles}
                onClick={path => showExitModal(path)} />
            </li>
          )
        }} />
        <SignOutButton />
      </ul>
      {modal && modal}
    </div>
  )
}
