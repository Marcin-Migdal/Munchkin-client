import React, { useEffect, useRef, useState } from 'react'
import { classes } from './InfoModal.styles'

export default function InfoModal({ text, mobile, onClick, customModal }) {
  const [isOpen, setIsOpen] = useState(true);
  const node = useRef();
  const styles = classes();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  })

  const handleClick = e => {
    if (node.current.contains(e.target)) return
    setIsOpen(false)
    onClick && onClick()
  };

  const Modal = () => {
    if (customModal) {
      return (
        <div ref={node}>
          {customModal}
        </div>
      )
    } else {
      return (
        <div className={mobile ? styles.containerMobile : styles.containerDesktop} ref={node}>
          {text}
        </div>
      )
    }
  }

  return isOpen && <Modal />
}
