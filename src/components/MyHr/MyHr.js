import React from 'react'
import { classes } from './MyHr.styles';

export default function MyHr({ paletteColor, customClass }) {
  const styles = classes();

  return (
    customClass ?
      <hr className={customClass} /> :
      <hr className={paletteColor === 'primary' ? styles.hrPrimaryColor : styles.hrSecondaryColor} />
  )
}
