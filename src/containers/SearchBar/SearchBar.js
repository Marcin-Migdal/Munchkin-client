import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import roomsService from '../../api/rooms.api';
import ListComponent from '../../components/ListComponent/ListComponent';
import RoomListSearchItem from '../../components/RoomListSearchItem/RoomListSearchItem';
import { desktopClasses } from './SearchBar.styles'
import { mobileClasses } from './SearchBarMobile.styles'

export default function SearchBar({ mobile, disableSearchBar }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className={styles.container} ref={node}>
      <input placeholder='Wyszukiwarka pokoi' className={styles.searchInput} type="text" onChange={(e) => { handleSearchInput(e) }} />
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
