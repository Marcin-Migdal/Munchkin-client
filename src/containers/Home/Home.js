import React from 'react'
import { useTranslation } from 'react-i18next';

export default function Home({ classes }) {
  const { t } = useTranslation();
  const styles = classes();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home</h1>
    </div>
  )
}
