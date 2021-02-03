import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Button, useTheme } from '@material-ui/core';
import MyHr from '../../components/MyHr/MyHr';
import * as IoIcons from "react-icons/io"
import { IconContext } from 'react-icons/lib';
import useFetchGet from '../../hooks/useFetchGet';
import MyAvatar from '../../components/MyAvatar/MyAvatar';
import { links } from '../../utils/linkUtils';

export default function UserPage({ classes, sideMenuActive, mobile }) {
  const theme = useTheme();
  const location = useLocation();
  const [userData] = useFetchGet({ url: '/api/auth/user' });
  const history = useHistory();
  const styles = classes();
  const user = location.state ? location.state.user : history.replace(links.home);

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
    history.push(links.settings)
  }

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        {user && <MyAvatar customStyles={styles.avatarIcon} inGameName={user.inGameName} id={user.id} />}
        {user &&
          <div className={styles.topRightContainer}>
            <p className={styles.nick}>{mobile ? user.inGameName : 'Pseudonim: ' + user.inGameName}
              <IconContext.Provider value={{ color: theme.palette.primary.main }}>
                {user.gender === 'male' ?
                  <IoIcons.IoMdMale className={styles.gender} /> :
                  <IoIcons.IoMdFemale className={styles.gender} />}
              </IconContext.Provider>
            </p>
            {userData &&
              <EditButton />}
          </div>
        }
      </div>

      <div className={sideMenuActive ? styles.customHrSlime : styles.customHrWide}>
        <MyHr paletteColor='primary' />
      </div>
    </div>
  )
}
