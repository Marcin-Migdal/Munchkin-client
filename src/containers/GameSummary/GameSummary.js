import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { CircularProgress, useTheme } from '@material-ui/core';
import playerStatusService from '../../api/playerStatus.api';
import ListComponent from '../../components/ListComponent/ListComponent';
import ExtendedPlayerListItem from '../../components/ExtendedPlayerListItem/ExtendedPlayerListItem';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function GameSummary({ classes }) {
  const { t } = useTranslation(['game']);
  const theme = useTheme()
  const location = useLocation();
  const history = useHistory();

  const [playerStatuses, setPlayerStatuses] = useState();
  const [isExtended, setIsExtended] = useState();
  const { layout, currentUser, currentUserLoading } = useSelector((state) => {
    return {
      layout: state.layout.layout,
      currentUser: state.currentUser.currentUser,
      currentUserLoading: state.currentUser.currentUserLoading
    }
  })

  const placementArray = [
    t('game:gameSummary.firstPlace'),
    t('game:gameSummary.secondPlace'),
    t('game:gameSummary.thirdPlace')
  ];

  const styles = classes();

  useEffect(() => {
    const checkIfEnteredCorrectly = () => {
      if (!location.state) {
        history.replace(links.rooms);
      }
    }

    const createIsExtendedArray = (length) => {
      let tempIsExtended = new Array(length)
      for (let i = 0; i < length; i++) {
        tempIsExtended[i] = { isExtended: false };
      }
      setIsExtended(tempIsExtended)
    }

    const fetchPlayerStatuses = () => {
      playerStatusService.getAllSortedPlayersStatusesInRoom(location.state.roomId)
        .then(playerStatuses => {
          createIsExtendedArray(playerStatuses.body.length)
          setPlayerStatuses(playerStatuses.body)
        })
        .catch((e) => {
          console.log(e)
        })
    }

    checkIfEnteredCorrectly()
    location.state && fetchPlayerStatuses()
  }, [location, history]);

  const showExtendedPlayerStatus = (index) => {
    let newIsExtended = [...isExtended]
    newIsExtended[index].isExtended = !isExtended[index].isExtended;
    setIsExtended(newIsExtended);
  }

  return (
    <div className={styles.scrollContainer}>
      <PerfectScrollbar>
        {location.state &&
          <div className={styles.scrollContentContainer}>
            <p className={styles.roomNameText}>Pokój: {location.state.roomName}</p>
            {(playerStatuses && !currentUserLoading && currentUser) ?
              <ListComponent data={playerStatuses} mapFunction={(playerStatus, index) => {
                return (
                  <IconContext.Provider key={index}
                    value={{
                      color: currentUser.id === playerStatus.user.id ?
                        theme.palette.current.main :
                        theme.palette.primary.main
                    }}>
                    <div className={styles.playerContainer}>
                      {placementArray[index] &&
                        <p className={styles.placementText}>
                          {placementArray[index]}
                        </p>
                      }
                      <ExtendedPlayerListItem
                        mobile={layout.mobile}
                        playerStatus={playerStatus}
                        isCurrentPlayer={currentUser.id === playerStatus.user.id}
                        creatorId={location.state.creatorId}
                        isExtended={isExtended[index].isExtended}
                        action={() => { showExtendedPlayerStatus(index) }}
                        onlyRead={true} />
                    </div>
                  </IconContext.Provider>
                )
              }} /> :
              <div className={styles.loaderContainer}>
                <CircularProgress size={layout.mobile ? 50 : 40} color="primary" />
              </div>
            }
          </div>
        }
      </PerfectScrollbar>
    </div>
  )
}