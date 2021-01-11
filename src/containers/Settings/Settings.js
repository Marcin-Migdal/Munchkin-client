import React from 'react'
import InputImage from '../../components/InputImage/InputImage'

export default function Settings({classes}) {
  const styles = classes();
  
  return (
    <div className={styles.container}>
      <InputImage />
    </div>
  )
}

