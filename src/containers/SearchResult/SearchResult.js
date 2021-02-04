import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import useFetchGetPagebale from '../../hooks/useFetchGetPageable';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import ListComponent from '../../components/ListComponent/ListComponent';
import InfoModal from '../../components/InfoModal/InfoModal';
import MyHr from '../../components/MyHr/MyHr';
import EditRoomSideMenu from '../RoomSideMenu/EditRoomSideMenu';
import PickRoomSideMenu from '../RoomSideMenu/PickRoomSideMenu';
import { Button } from '@material-ui/core';
import * as AiIcons from "react-icons/ai"
import RoomSearchListItem from '../../components/RoomSearchListItem/RoomSearchListItem';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { roomSearchListItemClasses } from '../../components/RoomSearchListItem/RoomSearchListItemLong.styles';

const pageSize = 12;
export default function SearchResult({ classes, mobile }) {
  const location = useLocation();

  const [query, setQuery] = useState();
  const [errorFlag, setErrorFlag] = useState(0);
  const [status, data, page, lastPage, restart] = useFetchGetPagebale({ query: query, errorFlag });
  const [roomSideMenu, setRoomSideMenu] = useState();
  
  const searchInput = location.state ? location.state.searchInput : ''
  const styles = classes();

  useEffect(() => {
    if (data) restart()
    if (searchInput) {
      setQuery('/search/' + searchInput + '/' + 0 + '/' + pageSize)
    }

  }, [searchInput]);

  const loadMoreRooms = () => {
    setQuery('/getAll/' + page + '/' + 12);
  }

  const loadRoomsAfterError = () => {
    setErrorFlag(errorFlag + 1)
  }

  const pickRoom = (room) => {
    setRoomSideMenu(
      <PickRoomSideMenu room={room} changeToEditRoom={() => { editRoom(room) }} mobile={mobile} />
    )
  }

  const editRoom = (room) => {
    setRoomSideMenu(
      <EditRoomSideMenu room={room} changeToPickRoom={() => { pickRoom(room) }} mobile={mobile} />
    )
  }

  const getErrorMessage = () => {
    if (!searchInput) {
      return "Prosze podać faraze wyszukiwania"
    }
    if (searchInput.trim()) {
      return 'Nie znaleziono pokoi za pomocą frazy "' + searchInput + '"'
    } else {
      return "Prosze podać faraze wyszukiwania"
    }
  }

  return (
    <div className={styles.scrollContainer}>
      <PerfectScrollbar onYReachEnd={() => { if (!lastPage && data && status === 'fetched') loadMoreRooms() }}>
        <div className={styles.scrollContentContainer}>
          {(data) &&
            <div className={styles.roomListContainer}>
              <ListComponent data={data} mapFunction={(room, index) => {
                return (
                  <RoomSearchListItem
                    key={index}
                    room={room}
                    mobile={mobile}
                    action={() => { pickRoom(room) }}
                    classes={roomSearchListItemClasses} />
                )
              }} />
            </div>
          }
          <div className={styles.bottomScrollContainer}>
            {(status === 'error') &&
              <div className={styles.errorContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.button}
                  onClick={loadRoomsAfterError}>
                  Wczytaj Pokoje
                </Button>
                <InfoModal
                  mobile={mobile}
                  text='Coś poszło nie tak, wystąpił błąd podczas wczytywania pokoi,
                  spróbuj wczytać pokoje jeszcze raz lub odśwież strone' />
              </div>}
            {status === 'notFound' &&
              <div className={styles.errorContainer}>
                <InfoModal
                  text={getErrorMessage()} mobile={mobile} />
              </div>
            }
            <LoadingComponent condition={(status === 'fetching')} />
          </div>
        </div>
      </PerfectScrollbar>

      <div className={roomSideMenu ? styles.roomSideMenuEnabled : styles.roomSideMenuDisabled}>
        <MyHr />
        <div className={styles.iconContainer} onClick={() => setRoomSideMenu()}>
          <AiIcons.AiOutlineClose />
        </div>
        {roomSideMenu && roomSideMenu}
      </div>
    </div>
  )
}

