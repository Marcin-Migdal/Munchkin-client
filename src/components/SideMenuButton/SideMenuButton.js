import React from 'react'
import { useHistory } from 'react-router-dom';

export default function SideMenuButton({ path, icon, page, classes }) {
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
