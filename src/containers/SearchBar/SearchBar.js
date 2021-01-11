import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import roomsService from '../../api/rooms.api';
import ListComponent from '../../components/ListComponent/ListComponent';
import RoomListSearchItem from '../../components/RoomListSearchItem/RoomListSearchItem';
import { Button } from '@material-ui/core';
import { desktopClasses } from './SearchBar.styles'
import { mobileClasses } from './SearchBarMobile.styles'
import * as AiIcons from "react-icons/ai"

export default function SearchBar({ mobile, disableSearchBar }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState();

  const history = useHistory();
  const styles = mobile ? mobileClasses() : desktopClasses();
  const node = useRef();

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);

  const handleClick = e => {
    if (node.current.contains(e.target)) return
    clearSearchResult();
  };

  const handleSearchInput = (e) => {
    if (e.target.value.length >= 2) {
      roomsService.getPageableRooms('/search/' + e.target.value + '/0/10')
        .then(res => {
          setData(res.body.content)
          setError()
        })
        .catch(e => {
          setData()
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
      pathname: '/room',
      state: {
        room: room,
      },
    });
  }

  const clearSearchResult = () => {
    setData()
    setError()
    setIsOpen(false)
  }

  const goToExtendedSearch = () => {
    clearSearchResult();
    history.push({
      pathname: '/searchResult',
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
          <IconContext.Provider value={{ color: '#ffcc00' }}>
            <AiIcons.AiOutlineSearch className={styles.icon} />
          </IconContext.Provider>
        </Button>
      </div>
      {(data) &&
        <div className={styles.searchContent}>
          <ListComponent data={data} mapFunction={(item, index) => {
            return (
              <RoomListSearchItem
                key={index}
                room={item}
                mobile={false}
                action={() => { pickRoom(item) }} />
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
