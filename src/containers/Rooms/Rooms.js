import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import useFetchPagebale from '../../hooks/useFetchPagebale';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import InfoModal from '../../components/InfoModal/InfoModal';
import ListComponent from '../../components/ListComponent/ListComponent';
import RoomListComponent from '../../components/RoomListComponent/RoomListComponent';
import AddRoomSideMenu from '../RoomSideMenu/AddRoomSideMenu';
import EditRoomSideMenu from '../RoomSideMenu/EditRoomSideMenu';
import MyHr from '../../components/MyHr/MyHr';
import * as AiIcons from "react-icons/ai"
import PickRoomSideMenu from '../RoomSideMenu/PickRoomSideMenu';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function Rooms({ roomClasses, mobile }) {
  const pageSize = 15;
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('/getAll/' + page + '/' + pageSize);
  const [errorFlag, setErrorFlag] = useState(0);
  const [roomSideMenu, setRoomSideMenu] = useState();
  const { status, data, lastPage } = useFetchPagebale({
    query: query,
    errorFlag,
    incrementPage: () => { setPage(page + 1) }
  });

  const styles = roomClasses();

  const loadMoreRooms = () => {
    setQuery('/getAll/' + (page) + '/' + pageSize);
  }

  const loadRoomsAfterError = () => {
    setErrorFlag(errorFlag + 1)
  }

  const addRoom = () => {
    setRoomSideMenu(
      <AddRoomSideMenu />
    )
  }

  const pickRoom = (item) => {
    setRoomSideMenu(
      <PickRoomSideMenu room={item} changeToEditRoom={(roomId) => { editRoom(roomId) }} />
    )
  }

  const editRoom = (roomId) => {
    setRoomSideMenu(
      <EditRoomSideMenu roomId={roomId} />
    )
  }

  return (
    <div className={styles.scrollContainer}>
      <PerfectScrollbar onYReachEnd={() => { if (!lastPage && data && status === 'fetched') loadMoreRooms() }}>
        <div className={styles.scrollContentContainer}>
          <div className={styles.topScrollContainer}>
            <ButtonComponent
              text='Dodaj Pokój'
              btnStyle={styles.addRoomButton}
              variantStyle='outlined'
              paletteColor='primary'
              action={() => { addRoom() }} />
          </div>

          {(data) &&
            <ListComponent data={data} mapFunction={(item, index) => {
              return (
                <RoomListComponent
                  key={index}
                  roomName={item.roomName}
                  slots={item.slots}
                  usersInRoom={item.usersInRoom}
                  mobile={mobile}
                  action={() => { pickRoom(item) }} />)
            }} />}

          <div className={styles.bottomScrollContainer}>
            {(status === 'error') &&
              <div className={styles.errorContainer}>
                <ButtonComponent
                  text='Wczytaj Pokoje'
                  btnStyle={styles.button}
                  variantStyle='contained'
                  paletteColor='primary'
                  action={() => { loadRoomsAfterError() }} />

                <InfoModal
                  text='Coś poszło nie tak, wystąpił błąd podczas wczytywania pokoi, spróbuj wczytać pokoje jeszcze raz lub odśwież strone' mobile={mobile} />
              </div>}
            <LoadingComponent condition={(status === 'fetching')} />
          </div>
        </div>
      </PerfectScrollbar>

      <div className={roomSideMenu ? styles.roomSideMenuEnabled : styles.roomSideMenuDisabled}>
        <MyHr />
        <div className={styles.iconContainer} onClick={() => setRoomSideMenu(false)}>
          <AiIcons.AiOutlineClose className={styles.closeIcon} />
        </div>
        {roomSideMenu && roomSideMenu}
      </div>
    </div>
  )
}

