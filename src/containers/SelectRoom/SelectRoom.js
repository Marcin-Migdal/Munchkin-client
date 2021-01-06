import React from 'react'
import { useLocation } from 'react-router-dom';
import { classes } from './SelectRoom.styles'

export default function SelectRoom() {
  const location = useLocation();
  const styles = classes();
  
  return (
    <div className={styles.container}>
      pokój z id: {location.state.roomId}
    </div>
  )
}
