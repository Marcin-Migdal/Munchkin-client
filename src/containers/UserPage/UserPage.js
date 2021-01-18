import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import userService from '../../api/user.api';
import { Avatar, Button } from '@material-ui/core';
import MyHr from '../../components/MyHr/MyHr';
import * as IoIcons from "react-icons/io"
import { IconContext } from 'react-icons/lib';
import useFetchGet from '../../hooks/useFetchGet';

export default function UserPage({ classes, sideMenuActive, mobile }) {
  const location = useLocation();
  const [user, setUser] = useState(location.state.user);
  const [avatar, setAvatar] = useState();
  const [userData] = useFetchGet({ url: '/api/auth/user' });
  const history = useHistory();
  const styles = classes();

  useEffect(() => {
    const getAvatar = () => {
      userService.getAvatar(user.id)
        .then(res => setAvatar(URL.createObjectURL(res)))
        .catch(e => console.log(e))
    }

    getAvatar();
  }, [user]);

  const EditButton = () => {
    if (userData.id === user.id) {
      return (
        <Button
          variant="outlined"
          color="primary"
          className={styles.editButton}
          onClick={goToEditUserPage}>
          Edytuj
        </Button>
      )
    }
    return <> </>
  }

  const goToEditUserPage = () => {
    history.push('/settings')
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <Avatar className={styles.avatarIcon} src={avatar}>{!avatar && user.inGameName.charAt(0)}</Avatar>
        <div className={styles.topRightContainer}>
          {user &&
            <p className={styles.nick}>{mobile ? user.inGameName : 'Pseudonim: ' + user.inGameName}
              <IconContext.Provider value={{ color: '#ffcc00' }}>
                {user.gender === 'male' ?
                  <IoIcons.IoMdMale className={styles.gender} /> :
                  <IoIcons.IoMdFemale className={styles.gender} />}
              </IconContext.Provider>
            </p>}
          {userData &&
            <EditButton />}
        </div>
      </div>

      <div className={sideMenuActive ? styles.customHrSlime : styles.customHrWide}>
        <MyHr paletteColor='primary' />
      </div>

      <div className={styles.bottomContainer}>
        {/* statistics, to do  */}
      </div>
    </div>
  )
}
