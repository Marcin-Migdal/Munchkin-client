import React from 'react'
import { useHistory } from 'react-router-dom';
import { classes } from './SideMenuButton.styles';

export default function SideMenuButton({ path, icon, page }) {
  const history = useHistory();
  const styles = classes();

  const goToPage = () => {
    history.replace(path)
  }

  return (
    <div className={styles.sideMenuItem} onClick={goToPage}>
      {icon}
      <span className={styles.sideMenuItemText}>
        {page}
      </span>
    </div>
  )
}
