import { Button } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react'
import { classes } from './ConfirmationModal.styles'
import { mobileClasses } from './ConfirmationModalMobile.styles '

export default function ConfirmationModal({ text, mobile, onClickYes, onClickNo }) {
  const [isOpen, setIsOpen] = useState(true);
  const styles = mobile ? mobileClasses() : classes();
  const node = useRef();

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
          Tak
        </Button>
        <Button
          className={styles.button}
          color='primary'
          variant="outlined"
          onClick={onClickNo}>
          Nie
        </Button>
      </div>
    </div>
  )
}


