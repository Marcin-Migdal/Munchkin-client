import { Button, IconButton } from '@material-ui/core';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { classes } from './HomePageComponent.styles'
import { mobileClasses } from './HomePageComponentMobile.styles'
import MyHr from '../MyHr/MyHr';
import * as IoIcons from "react-icons/io"

export default function HomePageComponent({ content, index, sideMenuActive, mobile }) {
  const [contentArrayIndex, setContentArrayIndex] = useState(0);
  const { buttonText, url, imagePath, description, title } = content[contentArrayIndex]

  const styles = mobile ? mobileClasses() : classes();

  const prevContent = () => setContentArrayIndex(prevState => prevState - 1)

  const nextContent = () => setContentArrayIndex(prevState => prevState + 1)

  const ImageContent = () => {
    return (
      <div id='imageContainer' className={styles.subContainer}>
        <img className={styles.image} src={imagePath} />
        {content.length > 1 &&
          <div className={styles.imageButtonContainer}>
            <IconButton onClick={prevContent} disabled={contentArrayIndex < 1}>
              <IoIcons.IoIosArrowBack />
            </IconButton>
            <IconButton onClick={nextContent} disabled={contentArrayIndex >= content.length - 1}>
              <IoIcons.IoIosArrowForward />
            </IconButton>
          </div>}
      </div>
    )
  }

  const SideContent = () => {
    return (
      <div id='sideContainer' className={styles.subContainer}>
        <p className={styles.titleText}>{title}</p>
        <span className={styles.description}>
          {description}
        </span>
        {url &&
          <Button
            className={styles.button}
            component={Link}
            to={url}
            color='primary'
            variant="outlined">
            {buttonText}
          </Button>
        }
      </div>
    )
  }

  const Content = () => {
    return (
      <>
        <div className={styles.container}>
          {index % 2 === 0 ?
            <>
              <ImageContent />
              <SideContent />
            </> :
            <>
              <SideContent />
              <ImageContent />
            </>
          }
        </div>
        <div>
          <MyHr customClass={!mobile && sideMenuActive ? styles.slimCustomHr : styles.wideCustomHr} />
        </div>
      </>
    )
  }


  return <Content />
}
