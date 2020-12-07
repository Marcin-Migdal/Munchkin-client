import React from 'react'
import * as FaIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { classes } from './Navbar.styles';

export default function Navbar({ toggleSideMenu }) {
  const history = useHistory();
  const styles = classes();

  const goToHomePage = () => {
    history.replace('/home')
  }

  return (
    <div className={styles.navbarContainer}>
      <FaIcons.FaBars onClick={toggleSideMenu} />
      <a className={styles.text} onClick={goToHomePage}>Munchkin</a>
    </div>
  )
}
