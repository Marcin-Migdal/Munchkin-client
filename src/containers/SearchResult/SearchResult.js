import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
import { roomSearchListItemClasses } from '../../components/RoomSearchListItem/RoomSearchListItemLong.styles';
import { useTranslation } from 'react-i18next';
import { layoutSelector } from '../../slices/layout';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoomInStore, fetchRoom } from '../../slices/room';
import { links } from '../../utils/linkUtils';
import 'react-perfect-scrollbar/dist/css/styles.css';

const pageSize = 11;
export default function SearchResult({ classes }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation(['inputLabels', 'rooms']);
  const location = useLocation();

  const { layout } = useSelector(layoutSelector)
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

    return history.listen((location) => {
      if (location.pathname !== links.game) {
        dispatch(deleteRoomInStore())
      }
    })

  }, [searchInput]);

  const loadMoreRooms = () => {
    if (!lastPage && data && status === 'fetched') {
      setQuery('/searchPageable/' + searchInput + '/' + page + '/' + pageSize)
    }
  }

  const loadRoomsAfterError = () => {
    setErrorFlag(errorFlag + 1)
  }

  const pickRoom = (roomId) => {
    roomId && dispatch(fetchRoom(roomId))
    setRoomSideMenu(
      <PickRoomSideMenu changeToEditRoom={editRoom} />
    )
  }

  const editRoom = () => {
    setRoomSideMenu(
      <EditRoomSideMenu changeToPickRoom={pickRoom} />
    )
  }

  const closeRoomSideMenu = () => {
    dispatch(deleteRoomInStore())
    setRoomSideMenu()
  }

  return (
    <div className={styles.scrollContainer}>
      <PerfectScrollbar onYReachEnd={loadMoreRooms}>
        <div className={styles.scrollContentContainer}>
          {(data) &&
            <div className={styles.roomListContainer}>
              <ListComponent data={data} mapFunction={(room, index) => {
                return (
                  <RoomSearchListItem
                    key={index}
                    room={room}
                    mobile={layout.mobile}
                    action={() => pickRoom(room.id)}
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
        <div className={styles.iconContainer} onClick={closeRoomSideMenu}>
          <AiIcons.AiOutlineClose />
        </div>
        {roomSideMenu && roomSideMenu}
      </div>
    </div>
  )
}

