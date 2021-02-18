import React, { useEffect, useRef, useState } from 'react'
import { classes } from './InfoModal.styles'

export default function InfoModal({ text, mobile, onClick, customModal }) {
  const [isOpen, setIsOpen] = useState(true);
  const node = useRef();
  const styles = classes();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
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
