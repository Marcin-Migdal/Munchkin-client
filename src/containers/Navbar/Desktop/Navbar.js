import React from 'react'
import * as FaIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../SearchBar/SearchBar';
import { classes } from './Navbar.styles';

export default function Navbar({ toggleSideMenu, mobile }) {
  const history = useHistory();
  const styles = classes();

  const goToHomePage = () => {
    history.replace('/home')
  }

  return (
    <div className={styles.navbarContainer}>
        <FaIcons.FaBars className={styles.icon} onClick={toggleSideMenu} />
        <p className={styles.text} onClick={goToHomePage}>Munchkin</p>
        <SearchBar mobile={mobile} />
      </div>
  )
}
