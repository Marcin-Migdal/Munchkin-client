import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { links } from '../../../utils/linkUtils';
import SearchBar from '../../SearchBar/SearchBar';
import { classes } from './NavbarMobile.styles';

export default function NavbarMobile({ toggleSideMenu, mobile, sideMenuActive }) {
  const history = useHistory();
  const [searchIsVisible, setSearchIsVisible] = useState(false);
  const styles = classes();

  const goToHomePage = () => {
    history.replace(links.home)
  }

  const NavbarContent = () => {
    if (searchIsVisible) {
      return (
        <div className={styles.navbarContainer}>
          <FaIcons.FaChevronLeft onClick={() => { setSearchIsVisible(false) }} className={styles.closeSearchIcon} />
          <SearchBar mobile={mobile} disableSearchBar={() => { setSearchIsVisible(false) }} />
        </div>
      )
    } else {
      return (
        <div className={styles.navbarContainer}>
          <FaIcons.FaBars onClick={toggleSideMenu} className={styles.menuIcon} />
          <p className={styles.text} onClick={goToHomePage}>Munchkin</p>
          {!sideMenuActive && <FaIcons.FaSearch onClick={() => { setSearchIsVisible(true) }} className={styles.searchIcon} />}
        </div>
      )
    }
  }

  return (
    <NavbarContent />
  )
}
