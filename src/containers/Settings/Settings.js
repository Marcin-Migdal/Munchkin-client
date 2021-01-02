import React from 'react'
import InputImage from '../../components/InputImage/InputImage'
import { classes } from './Settings.styles'

export default function Settings() {
  const styles = classes();
  
  return (
    <div className={styles.container}>
      <InputImage />
    </div>
  )
}

