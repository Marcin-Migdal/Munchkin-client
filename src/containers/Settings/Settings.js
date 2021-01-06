import React from 'react'
import InputImage from '../../components/InputImage/InputImage'

export default function Settings({settingsClasses}) {
  const styles = settingsClasses();
  
  return (
    <div className={styles.container}>
      <InputImage />
    </div>
  )
}

