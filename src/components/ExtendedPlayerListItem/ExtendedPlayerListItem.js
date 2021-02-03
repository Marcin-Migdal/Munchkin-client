import React, { useState, useEffect } from 'react'
import MyHr from '../MyHr/MyHr'
import PlayerStatisticsComponent from '../PlayerStatisticsComponent/PlayerStatisticsComponent'
import MyAvatar from '../MyAvatar/MyAvatar'
import ClassComponent from '../ClassComponent/ClassComponent'
import RaceComponent from '../RaceComponent/RaceComponent'
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'
import playerStatusService from '../../api/playerStatus.api'
import * as IoIcons from "react-icons/io"
import * as AiIcons from "react-icons/ai"
import { classes } from './ExtendedPlayerListItem.styles'

export default function ExtendedPlayerListItem({ mobile, playerStatus, creatorId, isCurrentPlayer, action, isExtended, refreshFlag, onlyRead }) {
  const [isChangeGenderModalVisible, setIsChangeGenderModalVisible] = useState(false);
  const [selectContent, setSelectContent] = useState({
    raceArray: [],
    classArray: [],
    isInMemory: false
  });

  const { playerBonus, playerLevel, gender } = playerStatus;
  const { inGameName, id } = playerStatus.user;

  useEffect(() => {
    const getRacesAndClasses = () => {
      playerStatusService.getAllRacesAndClasses()
        .then((res) => {
          setSelectContent(({ raceArray: res.body.playerRaces, classArray: res.body.playerClasses, isInMemory: true }))
        })
    }

    (isCurrentPlayer && !selectContent.isInMemory) && getRacesAndClasses();
  }, []);

  const styles = classes(isCurrentPlayer)()

  const showGenderModal = (e) => {
    if (isCurrentPlayer) {
      e.stopPropagation();
      setIsChangeGenderModalVisible(true)
    }
  }

  const GenderModal = () => {
    return (
      <ConfirmationModal
        text='Czy chcesz zmienić płeć postaci ?'
        mobile={mobile}
        onClickYes={saveNewGender}
        onClickNo={() => setIsChangeGenderModalVisible()} />
    )
  }

  const saveNewGender = () => {
    playerStatusService.changeGender(playerStatus.id)
      .then(() => {
        refreshFlag()
        setIsChangeGenderModalVisible()
      })
  }

  return (
    <div className={mobile ? styles.containerMobile : styles.containerDesktop}  >
      <div id='topContainer' className={styles.topContainer} onClick={(e) => action(e)}>
        <div className={styles.leftContainer}>
          <MyAvatar inGameName={inGameName} id={playerStatus.user.id} />
          {creatorId === id &&
            <AiIcons.AiOutlineCrown className={styles.creatorIcon} />
          }
          <p className={styles.usernameText}>{inGameName}</p>
        </div>
        <div className={styles.rightContainer}>
          <PlayerStatisticsComponent
            style={playerLevel < 9 ? styles.textContainer : styles.bigTextContainer}
            content={playerLevel}
            type='level'
            mobile={mobile}
            isCurrentPlayer={isCurrentPlayer} />
          <PlayerStatisticsComponent
            style={playerBonus < 9 ? styles.textContainer : styles.bigTextContainer}
            content={playerBonus}
            type='bonus'
            mobile={mobile}
            isCurrentPlayer={isCurrentPlayer} />
          <PlayerStatisticsComponent
            style={playerLevel + playerBonus < 9 ? styles.textContainer : styles.bigTextContainer}
            content={playerLevel + playerBonus}
            type='power'
            mobile={mobile}
            isCurrentPlayer={isCurrentPlayer} />

          <div className={styles.genderIcon} onClick={showGenderModal}>
            {gender === 'male' ?
              <IoIcons.IoMdMale /> :
              <IoIcons.IoMdFemale />
            }
          </div>
        </div>
      </div>
      {isExtended &&
        <div className={styles.bottomContainer} >
          <MyHr customClass={styles.customHrStyle} />
          <RaceComponent
            mobile={mobile}
            isCurrentPlayer={isCurrentPlayer}
            playerStatus={playerStatus}
            refreshFlag={refreshFlag}
            selectContent={selectContent.raceArray}
            onlyRead={onlyRead} />
          {playerStatus.twoRaces &&
            <RaceComponent
              mobile={mobile}
              isCurrentPlayer={isCurrentPlayer}
              playerStatus={playerStatus}
              refreshFlag={refreshFlag}
              isSecondRace={true}
              selectContent={selectContent.raceArray}
              onlyRead={onlyRead} />
          }
          <MyHr customClass={styles.shortCustomHrStyle} />

          <ClassComponent
            mobile={mobile}
            isCurrentPlayer={isCurrentPlayer}
            playerStatus={playerStatus}
            refreshFlag={refreshFlag}
            selectContent={selectContent.classArray}
            onlyRead={onlyRead} />
          {playerStatus.twoClasses &&
            <ClassComponent
              mobile={mobile}
              isCurrentPlayer={isCurrentPlayer}
              playerStatus={playerStatus}
              refreshFlag={refreshFlag}
              isSecondClass={true}
              selectContent={selectContent.classArray}
              onlyRead={onlyRead} />
          }
        </div>
      }
      {isChangeGenderModalVisible && <GenderModal />}
    </div>
  )
}