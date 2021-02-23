import { Button } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { layoutSelector } from '../../slices/layout';
import { classes } from './ConfirmationModal.styles'
import { mobileClasses } from './ConfirmationModalMobile.styles '

export default function ConfirmationModal({ text, onClickYes, onClickNo }) {
  const { layout } = useSelector(layoutSelector)
  const { t } = useTranslation();
  const node = useRef();

  const [isOpen, setIsOpen] = useState(true);

  const styles = layout.mobile ? mobileClasses() : classes();

  useEffect(() => {
    const handleClick = e => {
      if (node.current.contains(e.target)) return
      setIsOpen(false)
      onClickNo()
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  }, [isOpen, onClickNo])

  return (
    <div className={styles.container} ref={node}>
      {text}
      <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          color='primary'
          variant="outlined"
          onClick={onClickYes}>
          {t('menu:confirmationModal.yes')}
        </Button>
        <Button
          className={styles.button}
          color='primary'
          variant="outlined"
          onClick={onClickNo}>
          {t('menu:confirmationModal.no')}
        </Button>
      </div>
    </div>
  )
}


