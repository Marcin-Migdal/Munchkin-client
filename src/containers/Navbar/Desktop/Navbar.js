import React from 'react'
import * as FaIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { links } from '../../../utils/linkUtils';
import SearchBar from '../../SearchBar/SearchBar';
import { classes } from './Navbar.styles';

export default function Navbar({ toggleSideMenu }) {
  const history = useHistory();
  const styles = classes();

  const goToHomePage = () => {
    history.replace(links.home)
  }

  return (
    <div className={styles.navbarContainer}>
      <FaIcons.FaBars className={styles.icon} onClick={toggleSideMenu} />
      <p className={styles.text} onClick={goToHomePage}>Munchtrack</p>
      <SearchBar />
    </div>
  )
}
