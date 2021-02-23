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
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { layoutSelector } from '../../slices/layout';

const pageSize = 11;
export default function SearchResult({ classes }) {
  const { layout } = useSelector(layoutSelector)
  const { t } = useTranslation(['inputLabels', 'rooms']);
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
      setQuery('/searchPageable/' + searchInput + '/' + page + '/' + pageSize)
    }

  }, [searchInput]);

  const loadMoreRooms = () => {
    setQuery('/searchPageable/' + searchInput + '/' + page + '/' + pageSize)
  }

  const loadRoomsAfterError = () => {
    setErrorFlag(errorFlag + 1)
  }

  const pickRoom = (room) => {
    if (!room.complete) {
      setRoomSideMenu(
        <PickRoomSideMenu room={room} changeToEditRoom={() => { editRoom(room) }} />
      )
    }
  }

  const editRoom = (room) => {
    setRoomSideMenu(
      <EditRoomSideMenu room={room} changeToPickRoom={() => { pickRoom(room) }} />
    )
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
                    mobile={layout.mobile}
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
                  {t('rooms:searchResult.loadRooms')}
                </Button>
                <InfoModal text={t('rooms:searchResult.error')} />
              </div>}
            {status === 'notFound' &&
              <div className={styles.errorContainer}>
                <InfoModal text={t('rooms:searchResult.notFound') + "'" + searchInput + "'"} />
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

