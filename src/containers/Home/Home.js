import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import playerStatusService from '../../api/playerStatus.api';

export default function Home({ classes }) {
  const { t } = useTranslation();
  const styles = classes(); 
  
  useEffect(() => {
    playerStatusService.leaveRoomOnLogIn()
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home</h1>
    </div>
  )
}
