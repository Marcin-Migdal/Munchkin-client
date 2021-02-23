import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Button, useTheme } from '@material-ui/core';
import MyHr from '../../components/MyHr/MyHr';
import * as IoIcons from "react-icons/io"
import { IconContext } from 'react-icons/lib';
import MyAvatar from '../../components/MyAvatar/MyAvatar';
import { links } from '../../utils/linkUtils';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../slices/currentUser';

export default function UserPage({ classes, sideMenuActive, mobile }) {
  const { currentUser, loading } = useSelector(currentUserSelector)
  const { t } = useTranslation(['rooms', 'buttons']);
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();

  const styles = classes();

  const user = location.state ? location.state.user : history.replace(links.home);

  const EditButton = () => {
    if (currentUser.id === user.id) {
      return (
        <Button
          variant="outlined"
          color="primary"
          className={styles.editButton}
          onClick={goToEditUserPage}>
          {t('buttons:editRoom')}
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
            <p className={styles.nick}>{mobile ? user.inGameName : t('rooms:userPage.inGameName') + user.inGameName}
              <IconContext.Provider value={{ color: theme.palette.primary.main }}>
                {user.gender === 'male' ?
                  <IoIcons.IoMdMale className={styles.gender} /> :
                  <IoIcons.IoMdFemale className={styles.gender} />}
              </IconContext.Provider>
            </p>
            {(!loading && currentUser) &&
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
