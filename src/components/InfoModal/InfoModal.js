import React, { useEffect, useState } from 'react'
import { classes } from './InfoModal.styles'

export default function InfoModal({ text, mobile }) {
  const [visible, setVisible] = useState(true);;
  const styles = classes();

  useEffect(() => {
    let mounted = true;

    window.addEventListener("click", () => mounted && setVisible(false))
    return () => {
      mounted = false;
      window.removeEventListener("click", () => mounted && setVisible(false))
    }
  }, []);

  return visible &&
    <div className={mobile ? styles.containerMobile : styles.containerDesktop}>
      {text}
    </div>

}
