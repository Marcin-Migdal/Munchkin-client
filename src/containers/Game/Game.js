import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Button, CircularProgress, useTheme } from '@material-ui/core';
import { IconContext } from 'react-icons/lib';
import playerStatusService from '../../api/playerStatus.api';
import InfoModal from '../../components/InfoModal/InfoModal';
import ListComponent from '../../components/ListComponent/ListComponent';
import useFetchGet from '../../hooks/useFetchGet';
import ExtendedPlayerListItem from '../../components/ExtendedPlayerListItem/ExtendedPlayerListItem';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import roomsService from '../../api/rooms.api';
import PerfectScrollbar from 'react-perfect-scrollbar'
import * as AiIcons from "react-icons/ai"
import 'react-perfect-scrollbar/dist/css/styles.css';
import { links } from '../../utils/linkUtils';

export default function Game({ classes, mobile }) {
  const theme = useTheme()
  const location = useLocation();
  const history = useHistory();

  const [currentUser] = useFetchGet({ url: '/api/auth/user' });
  const [playerStatuses, setPlayerStatuses] = useState();
  const [playerStatusRefreshFlag, setPlayerStatusRefreshFlag] = useState(0);
  const [room, setRoom] = useState();

  const [notyfication, setNotyfication] = useState();

  const [isExtended, setIsExtended] = useState({ isExtendedArray: [], isInMemory: false });
  const [isModified, setIsModified] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [changeLevelButtonDisabled, setChangeLevelButtonDisabled] = useState(false);

  const styles = classes();

  useEffect(() => {
    let isMounted = true

    function handleEvent(event) {
      event.preventDefault();
      event.returnValue = '';
      playerStatusService.leaveRoom(location.state.roomId)
      setNotyfication(<LeftRoomModal />)
    }

    const checkIfEnteredCorrectly = () => {
      if (!location.state) {
        history.replace(links.rooms);
      }
    }

    isMounted && checkIfEnteredCorrectly()
    window.addEventListener("beforeunload", handleEvent);
    return () => {
      isMounted = false
      if (history.location.pathname !== links.game) {
        playerStatusService.leaveRoom(location.state.roomId)
      }
      window.removeEventListener("beforeunload", handleEvent);
    }
  }, [location, mobile, history]);

  useEffect(() => {
    let isMounted = true

    const isPlayerInRoom = (playerStatuses) => {
      let currentPlayerInRoom = false
      playerStatuses.forEach((playerStatus) => {
        if (playerStatus.user.id === currentUser.id) {
          currentPlayerInRoom = true;
        }
      })
      if (!currentPlayerInRoom) {
        setNotyfication(<LeftRoomModal />)
      }
    }

    const createIsExtendedArray = (length) => {
      let tempIsExtended = new Array(length)
      for (let i = 0; i < length; i++) {
        tempIsExtended[i] = { isExtended: false };
      }
      setIsExtended({ isExtendedArray: tempIsExtended, isInMemory: true })
    }

    const fetchPlayerStatuses = () => {
      playerStatusService.getAllPlayersStatusesInRoom(location.state.roomId)
        .then(playerStatuses => {
          if (playerStatusRefreshFlag === 0) {
            isPlayerInRoom(playerStatuses.body)
          }
          setPlayerStatuses(playerStatuses.body)
        })
        .catch((e) => {
          console.log(e)
          setNotyfication(<LeftRoomModal />)
        })
    }

    const fetchRoom = () => {
      roomsService.getRoom(location.state.roomId)
        .then(room => {
          setRoom(room.body)
          if (!isExtended.isInMemory) {
            createIsExtendedArray(room.body.slots)
          }
          if (room.body.complete) {
            goToGameSummary()
          } else {
            fetchPlayerStatuses()
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }

    if (location.state && isMounted && currentUser) {
      fetchRoom()
    }

    return () => {
      isMounted = false
    }
  }, [playerStatusRefreshFlag, location, history, currentUser]);

  const goToGameSummary = () => {
    history.replace({
      pathname: links.gameSummary,
      state: {
        room: room,
        user: currentUser
      }
    });
  }

  const confirmWinning = (index, playerStatus) => {
    let newPlayerStatuses = [...playerStatuses]
    playerStatus.playerLevel = 10;
    newPlayerStatuses[index] = playerStatus;

    setPlayerStatuses(newPlayerStatuses);
    savePlayerStatus()
  }


  const LeftRoomModal = () => {
    console.log(location.state.roomId)
    return (
      <InfoModal
        text='Opóściłeś pokój, chcąc wrócić do gry wejdź do niego jeszcze raz.'
        mobile={mobile}
        onClick={() => {
          history.replace({
            pathname: links.room,
            state: {
              roomId: location.state.roomId,
            }
          });
        }} />
    )
  }

  const findCurrentPlayerStatus = (playerStatuses, userId) => {
    let playerStatusData = {};

    playerStatuses.map((playerStatus, index) => {
      if (playerStatus.user.id === userId) {
        playerStatusData = {
          index: index,
          playerStatus: playerStatus,
        }
      }
    });

    return playerStatusData;
  }

  const setLevel = (level) => {
    saveButtonDisabled && setSaveButtonDisabled(false)
    changeLevelButtonDisabled && setChangeLevelButtonDisabled(false)
    const { playerStatus, index } = findCurrentPlayerStatus(playerStatuses, currentUser.id)

    if (playerStatus.playerLevel + level <= 0) {
      setNotyficationModal('Twój level nie może być mniejszy niż 1')
    }
    else if (playerStatus.playerLevel + level < 9) {
      playerStatus.playerLevel = playerStatus.playerLevel + level
      setNewPlayerStatuses(index, playerStatus)
    }
    else if (playerStatus.playerLevel + level === 9) {
      playerStatus.playerLevel = playerStatus.playerLevel + level
      setNewPlayerStatuses(index, playerStatus)
      setChangeLevelButtonDisabled(true)
    }
    else if (playerStatus.playerLevel + level === 10) {
      setWinningConfirmationModal(index, playerStatus)
      playerStatus.playerLevel = playerStatus.playerLevel + level
    }
  }

  const setWinningConfirmationModal = (index, playerStatus) => {
    setNotyfication(
      <ConfirmationModal
        mobile={mobile}
        text='Czy na pewno wbiłeś 10 lvl ?'
        onClickYes={() => confirmWinning(index, playerStatus)}
        onClickNo={() => declineWinning(index, playerStatus)} />
    )
  }

  const declineWinning = (index, playerStatus) => {
    let newPlayerStatuses = [...playerStatuses]
    playerStatus.playerLevel = 9
    newPlayerStatuses[index] = playerStatus;

    setPlayerStatuses(newPlayerStatuses);
    setNotyfication()
  }

  const setBonus = (bonus) => {
    const { playerStatus, index } = findCurrentPlayerStatus(playerStatuses, currentUser.id)

    if (playerStatus.playerBonus + bonus < 0) {
      setNotyficationModal('Twój bonus nie może być mniejszy niż 0')
    }
    else if (playerStatus.playerBonus + bonus > 990) {
      setNotyficationModal('Maksymalny bonus')
    }
    else {
      playerStatus.playerBonus = playerStatus.playerBonus + bonus
      setNewPlayerStatuses(index, playerStatus)
    }
  }

  const setNewPlayerStatuses = (index, playerStatus) => {
    let newPlayerStatuses = [...playerStatuses]
    newPlayerStatuses[index] = playerStatus;
    setPlayerStatuses(newPlayerStatuses);
    !isModified && setIsModified(true)
  }

  const setNotyficationModal = (text) => {
    setNotyfication(
      <InfoModal
        text={text}
        mobile={mobile}
        onClick={() => {
          setNotyfication()
        }} />
    )
  }

  const savePlayerStatus = () => {
    refreshPlayerStatuses()
    changeLevelButtonDisabled && setChangeLevelButtonDisabled(false)

    const { playerStatus } = findCurrentPlayerStatus(playerStatuses, currentUser.id);
    const playerStatusEditRequest = {
      playerStatusId: playerStatus.id,
      levelValue: playerStatus.playerLevel,
      bonusValue: playerStatus.playerBonus,
    }

    playerStatusService.savePlayerStatus(playerStatusEditRequest)
      .then((res) => {
        setIsModified(false)
        if (playerStatusEditRequest.levelValue === 10) {
          goToGameSummary()
        }
      })
      .catch((e) => {
        setNotyficationModal('Podczas próby zapisania statusu wystąpił problem')
        console.log(e)
      })
  }

  const refreshPlayerStatuses = () => {
    changeLevelButtonDisabled && setChangeLevelButtonDisabled(false)
    setIsModified(false);
    setPlayerStatusRefreshFlag(prevState => (prevState + 1))
  }

  const showExtendedPlayerStatus = (index) => {
    let newIsExtended = [...isExtended.isExtendedArray]
    newIsExtended[index].isExtended = !isExtended.isExtendedArray[index].isExtended;
    setIsExtended((prevState => ({ ...prevState, isExtendedArray: newIsExtended })));
  }

  const MyButton = ({ id, onClick, icon, type }) => {
    return (
      <Button
        disabled={type === 'levelUp' ? changeLevelButtonDisabled : false}
        id={id}
        className={styles.button}
        variant="outlined"
        color="primary"
        onClick={onClick}>
        {icon}
      </Button >
    )
  }

  return (
    <div className={styles.scrollContainer}>
      <PerfectScrollbar>
        <div className={styles.scrollContentContainer}>
          <div className={styles.topContainer}>
            {room && <p className={styles.roomNameText}>Pokój: {room.roomName}</p>}
            {(playerStatuses && currentUser && isExtended.isInMemory) ?
              <ListComponent data={playerStatuses} mapFunction={(playerStatus, index) => {
                return (
                  <IconContext.Provider key={index}
                    value={{
                      color: currentUser.id === playerStatus.user.id ?
                        theme.palette.current.main :
                        theme.palette.primary.main
                    }}>
                    <ExtendedPlayerListItem
                      mobile={mobile}
                      playerStatus={playerStatus}
                      isCurrentPlayer={currentUser.id === playerStatus.user.id}
                      creatorId={room.creatorId}
                      isExtended={isExtended.isExtendedArray[index].isExtended}
                      action={() => { showExtendedPlayerStatus(index) }}
                      refreshFlag={refreshPlayerStatuses} />
                  </IconContext.Provider>
                )
              }} /> :
              <div className={styles.loaderContainer}>
                <CircularProgress size={mobile ? 50 : 40} color="primary" />
              </div>
            }
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.bottomTextContainer}>
              <p className={styles.text}>Level</p>
              <p className={styles.text}>Bonus</p>
            </div>
            <div className={styles.playerStatusButtonContainer}>
              <IconContext.Provider value={{ color: theme.palette.primary.main }}>
                <MyButton
                  id='leftButton'
                  onClick={() => { setLevel(-1) }}
                  icon={<AiIcons.AiOutlineMinus />} />
                <MyButton
                  id='middleButton'
                  onClick={() => { setLevel(1) }}
                  icon={<AiIcons.AiOutlinePlus />}
                  type='levelUp' />
                <MyButton
                  id='middleButton'
                  onClick={() => { setBonus(-1) }}
                  icon={<AiIcons.AiOutlineMinus />} />
                <MyButton
                  id='rightButton'
                  onClick={() => { setBonus(1) }}
                  icon={<AiIcons.AiOutlinePlus />} />
              </IconContext.Provider>
            </div>
            <div className={styles.bottomButtonContainer}>
              {isModified &&
                <Button
                  id='save'
                  disabled={saveButtonDisabled}
                  className={styles.playerStatusButton}
                  variant={"contained"}
                  color="primary"
                  onClick={savePlayerStatus}>
                  Zapisz Status
                </Button>
              }
              <Button
                id='reload'
                className={styles.playerStatusButton}
                variant={"contained"}
                color="primary"
                onClick={refreshPlayerStatuses}>
                <AiIcons.AiOutlineReload />
              </Button>
            </div>
          </div>
          {notyfication}
        </div>
      </PerfectScrollbar>
    </div>
  )
}