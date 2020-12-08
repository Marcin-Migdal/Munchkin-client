import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import authenticationService from '../../api/authentication.api';
import SideMenuButton from '../../components/SideMenuButton/SideMenuButton';
import { SideMenuData } from '../../utils/SideMenuUtils';

export default function SideMenu({ sideMenuActive, closeSideMenu, classes }) {
  const styles = classes();

  return (
    <div className={sideMenuActive ? styles.sideMenuEnabled : styles.sideMenuDisabled}>
      <hr className={styles.sideMenuHr} />
      <ul className={styles.sideMenuItems} >
        {SideMenuData.map((item, index) => {
          return (
            <li className={styles.sideMenuItem} key={index} onClick={closeSideMenu}>
              <SideMenuButton path={item.path} icon={item.icon} title={item.title} textStyle={styles.sideMenuItemText} />
            </li>
          );
        })}
        <div onClick={authenticationService.signOut}>
          <SideMenuButton ssd={styles.sideMenuItem} path='/' icon={<AiOutlineLogout />} title='Wyloguj' textStyle={styles.sideMenuItemText}/>
        </div>
      </ul>
    </div>
  )
}
