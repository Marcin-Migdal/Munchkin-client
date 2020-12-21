import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import authenticationService from '../../api/authentication.api';
import ListComponent from '../../components/ListComponent/ListComponent';
import SideMenuButton from '../../components/SideMenuButton/SideMenuButton';
import { SideMenuData } from '../../utils/SideMenuUtils';
import { classes } from './SideMenu.styles';

export default function SideMenu({ closeSideMenu }) {
  const styles = classes();

  return (
    <div>
      <hr className={styles.sideMenuHr} />
      <ul>
        <ListComponent data={SideMenuData} mapFunction={(item, index) => {
          return (
            <li key={index} onClick={closeSideMenu}>
              <SideMenuButton path={item.path} icon={item.icon} page={item.page} />
            </li>
          )
        }} />
        <div onClick={authenticationService.signOut}>
          <SideMenuButton path='/' icon={<AiOutlineLogout />} page='Wyloguj' />
        </div>
      </ul>
    </div>
  )
}
