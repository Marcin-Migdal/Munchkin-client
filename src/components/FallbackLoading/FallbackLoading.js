import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { classes } from './FallbackLoading.styles'

export default function FallbackLoading() {
  const styles = classes();
  return (
    <div className={styles.container}>
      <CircularProgress color="primary" />
    </div>
  )
}
