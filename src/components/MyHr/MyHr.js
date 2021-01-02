import React from 'react'
import { classes } from './MyHr.styles';

export default function MyHr() {
  const styles = classes();
  return <hr className={styles.sideMenuHr} />
}
