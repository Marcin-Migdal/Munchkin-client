import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../SearchBar/SearchBar';
import { classes } from './NavbarMobile.styles';

export default function NavbarMobile({ toggleSideMenu, mobile, sideMenuActive }) {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
  const styles = classes();

  const goToHomePage = () => {
    history.replace('/home')
  }

  const NavbarContent = () => {
    if (!isVisible) {
      return (
        <div className={styles.navbarContainer}>
          <FaIcons.FaBars onClick={toggleSideMenu} className={styles.menuIcon} />
          <p className={styles.text} onClick={goToHomePage}>Munchkin</p>
          {!sideMenuActive && <FaIcons.FaSearch onClick={() => { setIsVisible(true) }} className={styles.searchIcon} />}
        </div>
      )
    } else {
      return (
        <div className={styles.navbarContainer}>
          <SearchBar mobile={mobile} disableSearchBar={() => { setIsVisible(false) }} />
          <FaIcons.FaChevronLeft onClick={() => { setIsVisible(false) }} className={styles.searchIcon} />
        </div>
      )
    }
  }

  return (
    <NavbarContent />
  )
}
