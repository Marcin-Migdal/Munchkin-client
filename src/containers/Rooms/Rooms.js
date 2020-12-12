import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import useFetchPagebale from '../../hooks/useFetchPagebale';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import InfoModal from '../../components/InfoModal/InfoModal';
import ListComponent from '../../components/ListComponent/ListComponent';
import RoomListComponent from '../../components/RoomListComponent/RoomListComponent';
import 'react-perfect-scrollbar/dist/css/styles.css';
import api from '../../api/api';

export default function Rooms({ roomClasses, mobile }) {
  const pageSize = 15;
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('/api/rooms/getAll/' + page + '/' + pageSize);
  const [errorFlag, setErrorFlag] = useState(0);
  const { status, data, error, lastPage } = useFetchPagebale({
    url: query,
    errorFlag,
    incrementPage: () => { setPage(page + 1) }
  });

  const styles = roomClasses();

  const loadMoreRooms = () => {
    setQuery('/api/rooms/getAll/' + (page) + '/' + pageSize);
  }

  const loadRoomsAfterError = () => {
    setErrorFlag(errorFlag + 1)
  }

  const addRoom = () => {
    console.log('To do, pick room')
  }

  const pickRoom = () => {
    console.log('To do, pick room')
  }

  return (
    <div className={styles.scrollContainer}>
      <PerfectScrollbar onYReachEnd={() => { if (!lastPage && data && status === 'fetched' && !error) loadMoreRooms() }}>
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
                  action={() => { pickRoom() }} />)
            }} />}

          <div className={styles.bottomScrollContainer}>
            {(error && status === 'fetched') &&
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
    </div>
  )
}

