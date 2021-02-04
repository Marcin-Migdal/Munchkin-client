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

export default function SearchBar({ mobile, disableSearchBar }) {
  const theme = useTheme();
  const history = useHistory();
  const node = useRef();

  const [searchResult, setSearchResult] = useState();
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState();

  const styles = mobile ? mobileClasses() : desktopClasses();

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
  }

  const handleSearchInput = (e) => {
    if (e.target.value.length >= 2) {
      roomsService.getPageableRooms('/search/' + e.target.value + '/0/10')
        .then(res => {
          setSearchResult(res.body.content)
          setError()
        })
        .catch(e => {
          setSearchResult()
          setError('Nie znaleziono żadnego pokoju')
        })
      setIsOpen(true)
    } else {
      clearSearchResult();
    }
    setSearchInput(e.target.value)
  }

  const pickRoom = (room) => {
    if (mobile) {
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
        <input placeholder='Wyszukiwarka pokoi' className={styles.searchInput} type="text" onChange={(e) => { handleSearchInput(e) }} />
        <Button
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
          <ListComponent data={searchResult} mapFunction={(room, index) => {
            return (
              <RoomSearchListItem
                key={index}
                room={room}
                mobile={false}
                action={() => { pickRoom(room) }}
                classes={roomSearchListItemClasses} />
            )
          }} />
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
