import { Button, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import * as HiIcons from "react-icons/hi"
import { IconContext } from 'react-icons/lib';
import InfoModal from '../InfoModal/InfoModal';
import { classes } from './Dropdown.styles'

const sortOptions = [
  {
    id: 1,
    text: 'Datą powstania',
    sortBy: 'id',
  },
  {
    id: 2,
    text: 'Nazwą',
    sortBy: 'roomName',
  },
  {
    id: 3,
    text: 'Moje pokoje',
    sortBy: 'createdByMe',
  },
];

export default function Dropdown({ chooseSortOption }) {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false);

  const styles = classes()

  const toggle = () => setIsOpen(!isOpen);

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
          onClick={() => toggle(!isOpen)}
          endIcon={<HiIcons.HiOutlineSortDescending />}>
          Sortuj
        </Button>
      </IconContext.Provider>
      {isOpen &&
        <InfoModal
          onClick={() => { setIsOpen() }}
          customModal={
            <ul className={styles.list}>
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