import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai';
import authenticationService from '../../api/authentication.api';
import ListComponent from '../../components/ListComponent/ListComponent';
import MyHr from '../../components/MyHr/MyHr';
import SideMenuButton from '../../components/SideMenuButton/SideMenuButton';
import { SideMenuData } from '../../utils/SideMenuUtils';

export default function SideMenu({ closeSideMenu }) {
  return (
    <div>
      <MyHr/>
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
