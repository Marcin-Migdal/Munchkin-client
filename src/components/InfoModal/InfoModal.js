import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { layoutSelector } from '../../slices/layout';
import { classes } from './InfoModal.styles'

export default function InfoModal({ text, onClick, customModal }) {
  const { layout } = useSelector(layoutSelector)
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
        <div className={layout.mobile ? styles.containerMobile : styles.containerDesktop} ref={node}>
          {text}
        </div>
      )
    }
  }

  return isOpen && <Modal />
}
