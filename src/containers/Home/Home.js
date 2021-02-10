import React, { useEffect } from 'react'
import playerStatusService from '../../api/playerStatus.api';

export default function Home({ classes }) {
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
