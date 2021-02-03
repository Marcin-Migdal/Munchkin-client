import React from 'react'
import { useHistory } from 'react-router-dom';
import { links } from '../../utils/linkUtils';

export default function SideMenuButton({ path, icon, text, classes, onClick }) {
  const history = useHistory();
  const styles = classes();

  const goToPage = () => {
    if (history.location.pathname === links.game) {
      onClick(path)
      return;
    }

    if (!path) {
      onClick()
      return;
    } 

    history.push(path);
  }

  return (
    <div className={styles.sideMenuItem} onClick={goToPage}>
      {icon}
      <span className={styles.sideMenuItemText}>
        {text}
      </span>
    </div>
  )
}
