import React, { useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { layoutSelector } from '../../slices/layout';
import { deleteRoomInStore, fetchRoom } from '../../slices/room';
import { links } from '../../utils/linkUtils';
import { useHistory } from 'react-router-dom';

const pageSize = 12;
export default function Rooms({ classes }) {
  const dispatch = useDispatch()
  const { t } = useTranslation(['inputLabels', 'rooms']);
  const history = useHistory()

  const { layout } = useSelector(layoutSelector)
  const [sortType, setSortType] = useState('id');
  const [query, setQuery] = useState('/getAll/' + 0 + '/' + pageSize + '/' + sortType);
  const [errorFlag, setErrorFlag] = useState(0);
  const [status, data, page, lastPage, restart] = useFetchGetPagebale({ query: query, errorFlag });
  const [roomSideMenu, setRoomSideMenu] = useState();

  const styles = classes();

  useEffect(() => {
    return history.listen((location) => {
      if (location.pathname !== links.game) {
        dispatch(deleteRoomInStore())
      }
    })
  }, []);

  const loadMoreRooms = () => {
    setQuery('/getAll/' + page + '/' + pageSize + '/' + sortType);
  }

  const loadRoomsAfterError = () => {
    setErrorFlag(errorFlag + 1)
  }

  const addRoom = () => {
    setRoomSideMenu(
      <AddRoomSideMenu />
    )
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

  const setRoomSortType = (sortBy) => {
    if (sortBy !== sortType) {
      restart()
      setSortType(sortBy)
      setQuery('/getAll/' + 0 + '/' + pageSize + '/' + sortBy);
    }
  }

  const closeRoomSideMenu = () => {
    dispatch(deleteRoomInStore())
    setRoomSideMenu()
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
              {t('rooms:rooms.buttons.addRoom')}
            </Button>
            <Dropdown
              chooseSortOption={(sortBy) => {
                setRoomSortType(sortBy)
              }} />
          </div>

          {(data) &&
            <div className={styles.roomListContainer}>
              <ListComponent data={data} mapFunction={(item, index) => {
                return (
                  <RoomListItem
                    key={index}
                    room={item}
                    mobile={layout.mobile}
                    action={() => { pickRoom(item.id) }} />
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
                  {t('rooms:rooms.buttons.loadRooms')}
                </Button>
                <InfoModal text={t('rooms:rooms.error')} />
              </div>}
            <LoadingComponent condition={(status === 'fetching')} />
          </div>
        </div>
      </PerfectScrollbar>

      <div className={roomSideMenu ? styles.roomSideMenuEnabled : styles.roomSideMenuDisabled}>
        <MyHr />
        <div className={styles.iconContainer} onClick={() => closeRoomSideMenu()}>
          <AiIcons.AiOutlineClose />
        </div>
        {roomSideMenu && roomSideMenu}
      </div>
    </div>
  )
}

