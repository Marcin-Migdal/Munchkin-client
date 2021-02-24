import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import roomsService from '../../api/rooms.api';
import ListComponent from '../../components/ListComponent/ListComponent';
import { Button, useTheme } from '@material-ui/core';
import { desktopClasses } from './SearchBar.styles'
import { mobileClasses } from './SearchBarMobile.styles'
import * as AiIcons from "react-icons/ai"
import { links } from '../../utils/linkUtils';
import RoomSearchListItem from '../../components/RoomSearchListItem/RoomSearchListItem';
import { roomSearchListItemClasses } from '../../components/RoomSearchListItem/RoomSearchListItemShort.styles';
import { useTranslation } from 'react-i18next';
import InfoModal from '../../components/InfoModal/InfoModal';
import { layoutSelector } from '../../slices/layout';
import { useSelector } from 'react-redux';

export default function SearchBar({ disableSearchBar }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const history = useHistory();
  const node = useRef();

  const { layout } = useSelector(layoutSelector)
  const [searchResult, setSearchResult] = useState();
  const [searchInput, setSearchInput] = useState();
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const styles = layout.mobile ? mobileClasses() : desktopClasses();

  useEffect(() => {
    const handleClick = e => {
      if (node.current.contains(e.target)) {
        return
      } else {
        setSearchResult()
        setError()
        setIsOpen(false)
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);

  const clearSearchResult = () => {
    setSearchResult()
    setError()
    setIsOpen(false)
    setSearchInput()
  }

  const handleSearchInput = (e) => {
    if (e.target.value.length >= 2) {
      roomsService.getSearchedRooms(e.target.value)
        .then(res => {
          setSearchResult(res.body)
          setError()
        })
        .catch(e => {
          setSearchResult()
          setError(t('menu:searchBar.error'))
        })
      setIsOpen(true)
    } else {
      clearSearchResult();
    }
    setSearchInput(e.target.value)
  }

  const pickRoom = (room) => {
    if (layout.mobile) {
      disableSearchBar()
    }
    clearSearchResult();
    history.push({
      pathname: links.room,
      state: {
        roomId: room.id,
      },
    });
  }

  const goToExtendedSearch = () => {
    clearSearchResult();
    history.push({
      pathname: links.searchResult,
      state: {
        searchInput: searchInput,
      },
    });
  }

  return (
    <div className={styles.container} ref={node}>
      <div className={styles.searchBarContainer}>
        <input placeholder={t('menu:searchBar.inputPlaceHolder')} className={styles.searchInput} type="text" onChange={handleSearchInput} />
        <Button
          disabled={searchInput ? false : true}
          variant="outlined"
          color="secondary"
          className={styles.searchButton}
          onClick={goToExtendedSearch}>
          <IconContext.Provider value={{ color: theme.palette.primary.main }}>
            <AiIcons.AiOutlineSearch className={styles.icon} />
          </IconContext.Provider>
        </Button>
      </div>
      {(searchResult) &&
        <div className={styles.searchContent}>
          <InfoModal
            onClick={clearSearchResult}
            customModal={
              <ListComponent data={searchResult} mapFunction={(room, index) => {
                return (
                  <RoomSearchListItem
                    key={index}
                    room={room}
                    mobile={false}
                    action={() => pickRoom(room)}
                    classes={roomSearchListItemClasses} />
                )
              }} />
            } />
        </div>
      }
      {error &&
        <div className={styles.searchError}>
          {error}
        </div>
      }
    </div>
  )
}
