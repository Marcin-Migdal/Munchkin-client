import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Button, useTheme } from '@material-ui/core';
import * as IoIcons from "react-icons/io"
import { IconContext } from 'react-icons/lib';
import MyAvatar from '../../components/MyAvatar/MyAvatar';
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoomInStore } from '../../slices/room';

export default function UserPage({ classes }) {
  const dispatch = useDispatch()
  const { t } = useTranslation(['rooms', 'buttons']);
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();

  const styles = classes();

  const [user, setUser] = useState();
  const { layout, currentUser } = useSelector((state) => {
    return {
      layout: state.layout.layout,
      currentUser: state.currentUser.currentUser
    }
  })

  useEffect(() => {
    let isMounted = true

    if (isMounted && location.state) {
      setUser(location.state.user)
    } else {
      history.replace(links.home)
    }

    return history.listen((location) => {
      isMounted = false
      if (location.pathname !== links.room) {
        dispatch(deleteRoomInStore())
      }
    })
  }, [location]);

  const goToEditUserPage = () => {
    history.push(links.settings)
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        {user && <MyAvatar customStyles={styles.avatarIcon} inGameName={user.inGameName} id={user.id} />}
        {user &&
          <div className={styles.topRightContainer}>
            <p className={styles.nick}>{layout.mobile ? user.inGameName : t('rooms:userPage.inGameName') + user.inGameName}
              <IconContext.Provider value={{ color: theme.palette.primary.main }}>
                {user.gender === 'male' ?
                  <IoIcons.IoMdMale className={styles.gender} /> :
                  <IoIcons.IoMdFemale className={styles.gender} />}
              </IconContext.Provider>
            </p>
            {(currentUser && currentUser.id === user.id) &&
              <Button
                variant="outlined"
                color="primary"
                className={styles.editButton}
                onClick={goToEditUserPage}>
                {t('buttons:editRoom')}
              </Button>
            }
          </div>
        }
      </div>
    </div>
  )
}
