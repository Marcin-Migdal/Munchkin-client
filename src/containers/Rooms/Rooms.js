import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import useFetchGetPagebale from '../../hooks/useFetchGetPagebale';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import ListComponent from '../../components/ListComponent/ListComponent';
import RoomListItem from '../../components/RoomListItem/RoomListItem';
import InfoModal from '../../components/InfoModal/InfoModal';
import MyHr from '../../components/MyHr/MyHr';
import AddRoomSideMenu from '../RoomSideMenu/AddRoomSideMenu';
import EditRoomSideMenu from '../RoomSideMenu/EditRoomSideMenu';
import PickRoomSideMenu from '../RoomSideMenu/PickRoomSideMenu';
import * as AiIcons from "react-icons/ai"
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Button } from '@material-ui/core';

export default function Rooms({ roomClasses, mobile }) {
  const pageSize = 15;
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('/getAll/' + page + '/' + pageSize);
  const [errorFlag, setErrorFlag] = useState(0);
  const [status, data, lastPage] = useFetchGetPagebale({
    query: query,
    errorFlag,
    incrementPage: () => { setPage(page + 1) }
  });
  const [roomSideMenu, setRoomSideMenu] = useState();

  const styles = roomClasses();

  const loadMoreRooms = () => {
    setQuery('/getAll/' + (page) + '/' + pageSize);
  }

  const loadRoomsAfterError = () => {
    setErrorFlag(errorFlag + 1)
  }

  const addRoom = () => {
    setRoomSideMenu(
      <AddRoomSideMenu mobile={mobile} />
    )
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

  return (
    <div className={styles.scrollContainer}>
      <PerfectScrollbar onYReachEnd={() => { if (!lastPage && data && status === 'fetched') loadMoreRooms() }}>
        
        <div className={styles.topScrollContainer}>
          <Button
            variant="outlined"
            color="primary"
            className={styles.addRoomButton}
            onClick={addRoom}>
            Dodaj Pokój
          </Button>
        </div>

        {(data) &&
          <div className={styles.roomListContainer}>
            <ListComponent data={data} mapFunction={(item, index) => {
              return (
                <RoomListItem
                  key={index}
                  room={item}
                  mobile={mobile}
                  action={() => { pickRoom(item) }} />)
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
                text='Coś poszło nie tak, wystąpił błąd podczas wczytywania pokoi, spróbuj wczytać pokoje jeszcze raz lub odśwież strone' mobile={mobile} />
            </div>}
          <LoadingComponent condition={(status === 'fetching')} />
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

