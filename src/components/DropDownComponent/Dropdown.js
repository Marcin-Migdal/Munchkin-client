import { Button, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as HiIcons from "react-icons/hi"
import { IconContext } from 'react-icons/lib';
import InfoModal from '../InfoModal/InfoModal';
import { classes } from './Dropdown.styles'

export default function Dropdown({ chooseSortOption, mobile }) {
  const { t } = useTranslation(['rooms']);
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false);

  const styles = classes()

  const openDropDownMenu = () => {
    !isOpen && setIsOpen(true)
  };

  const sortOptions = [
    {
      id: 1,
      text: t('rooms:rooms.sortOptions.byDate'),
      sortBy: 'id',
    },
    {
      id: 2,
      text: t('rooms:rooms.sortOptions.byName'),
      sortBy: 'roomName',
    },
    {
      id: 3,
      text: t('rooms:rooms.sortOptions.createdByMe'),
      sortBy: 'createdByMe',
    },
  ];

  const handleEvent = (sortBy) => {
    setIsOpen(false)
    chooseSortOption(sortBy)
  }

  return (
    <div className={styles.container}>
      <IconContext.Provider value={{ color: theme.palette.primary.main }}>
        <Button
          className={styles.openDropMenuButton}
          variant="outlined"
          color="primary"
          onClick={openDropDownMenu}
          endIcon={<HiIcons.HiOutlineSortDescending />}>
          {t('rooms:rooms.buttons.sort')}
        </Button>
      </IconContext.Provider>
      {isOpen &&
        <InfoModal
          onClick={() => { setIsOpen(false) }}
          customModal={
            <ul className={mobile ? styles.mobileList : styles.list}>
              {sortOptions.map(item => (
                <button
                  key={item.id}
                  className={styles.button}
                  onClick={() => handleEvent(item.sortBy)}>
                  <p>{item.text}</p>
                </button>
              ))}
            </ul>
          } />
      }
    </div>
  );
} 