import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import authenticationService from '../../api/authentication.api';
import ListComponent from '../../components/ListComponent/ListComponent';
import SideMenuButton from '../../components/SideMenuButton/SideMenuButton';
import { SideMenuData } from '../../utils/SideMenuUtils';
import MyHr from '../../components/MyHr/MyHr';
import { classes } from '../../components/SideMenuButton/SideMenuButton.styles';
import { mobileClasses } from '../../components/SideMenuButton/SideMenuButtonMobile.styles';

export default function SideMenu({ closeSideMenu, mobile }) {
  const styles = mobile ? mobileClasses : classes;
  
  return (
    <div>
      <MyHr />
      <ul>
        <ListComponent data={SideMenuData} mapFunction={(item, index) => {
          return (
            <li key={index} onClick={closeSideMenu}>
              <SideMenuButton path={item.path} icon={item.icon} page={item.page} classes={styles} />
            </li>
          )
        }} />
        <div onClick={authenticationService.signOut}>
          <SideMenuButton path='/' icon={<AiOutlineLogout />} page='Wyloguj' classes={styles} />
        </div>
      </ul>
    </div>
  )
}
