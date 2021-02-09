import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import useFetchGetPagebale from '../../hooks/useFetchGetPageable';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import ListComponent from '../../components/ListComponent/ListComponent';
import RoomListItem from '../../components/RoomListItem/RoomListItem';
import InfoModal from '../../components/InfoModal/InfoModal';
import MyHr from '../../components/MyHr/MyHr';
import AddRoomSideMenu from '../RoomSideMenu/AddRoomSideMenu';
import EditRoomSideMenu from '../RoomSideMenu/EditRoomSideMenu';
import PickRoomSideMenu from '../RoomSideMenu/PickRoomSideMenu';
import { Button } from '@material-ui/core';
import Dropdown from '../../components/DropDownComponent/Dropdown';
import * as AiIcons from "react-icons/ai"
import 'react-perfect-scrollbar/dist/css/styles.css';

const pageSize = 12;
export default function Rooms({ classes, mobile }) {
  const [sortType, setSortType] = useState('id');
  const [query, setQuery] = useState('/getAll/' + 0 + '/' + pageSize + '/' + sortType);
  const [errorFlag, setErrorFlag] = useState(0);
  const [status, data, page, lastPage, restart] = useFetchGetPagebale({ query: query, errorFlag });

  const [roomSideMenu, setRoomSideMenu] = useState();
  const styles = classes();

  const loadMoreRooms = () => {
    setQuery('/getAll/' + page + '/' + pageSize + '/' + sortType);
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

  const setRoomSortType = (sortBy) => {
    if(sortBy !== sortType){
      restart()
      setSortType(sortBy)
      setQuery('/getAll/' + 0 + '/' + pageSize + '/' + sortBy);
    }
  }

  return (
    <div className={styles.scrollContainer}>
      <PerfectScrollbar onYReachEnd={() => { if (!lastPage && data && status === 'fetched') loadMoreRooms() }}>
        <div className={styles.scrollContentContainer}>
          <div className={styles.topScrollContainer}>
            <Button
              variant="outlined"
              color="primary"
              className={styles.topButton}
              onClick={addRoom}>
              Dodaj Pokój
            </Button>
            <Dropdown chooseSortOption={(sortBy) => { setRoomSortType(sortBy) }} />
          </div>

          {(data) &&
            <div className={styles.roomListContainer}>
              <ListComponent data={data} mapFunction={(item, index) => {
                return (
                  <RoomListItem
                    key={index}
                    room={item}
                    mobile={mobile}
                    action={() => { pickRoom(item) }} />
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
                  text='Coś poszło nie tak, wystąpił błąd podczas wczytywania pokoi, spróbuj wczytać pokoje jeszcze raz lub odśwież strone' mobile={mobile} />
              </div>}
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

