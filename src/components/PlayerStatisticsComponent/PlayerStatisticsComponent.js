import { useTheme } from '@material-ui/core';
import React, { useState } from 'react'
import InfoModal from '../InfoModal/InfoModal';
import { classes } from './PlayerStatisticsComponent.styles'

export default function PlayerStatisticsComponent({ style, content, type, mobile, isCurrentPlayer }) {
  const theme = useTheme();

  const [modalType, setModalType] = useState('inGame');
  const [playerStatisticsModal, setPlayerStatisticsModal] = useState();
  
  const styles = classes(isCurrentPlayer ? theme.palette.current : theme.palette.primary , modalType)();

  const handleClick = (e) => {
    e.stopPropagation();
    switch (type) {
      case 'level':
        setPlayerStatisticsModal({ title: "Level", description: "Level postaci jest warunkiem zwycięztwa, zdobycie 10 lvl oznacza zwycięstwo oraz zakończenie gry" })
        break;
      case 'bonus':
        setPlayerStatisticsModal({ title: "Bonus", description: "Bonus postaci zdobywa sie zakładając przedmioty np: Broń, zbroja (bonus pozostaje do momentu zdjęcia części ekwipunku) oraz za pomocą kart jednorazowego użytku (bonus pozostaje na czas walki w której użyto karty), bonus jest częścią mocy gracza" })
        break;
      case 'power':
        setPlayerStatisticsModal({ title: "Moc", description: "Na moc postaci składa się suma level'u gracza oraz jego bonusu, moc postaci to statystyka przeważająca o wygranej lub przegranej z potworem" })
        break;
      case 'sideMenu':
        setPlayerStatisticsModal({ title: "Level", description: "Level postaci jest warunkiem zwycięztwa, zdobycie 10 lvl oznacza zwycięstwo oraz zakończenie gry"  })
        setModalType('sideMenu')
        break;
      default:
        break;
    }
  }

  const PlayerStatisticsModal = () => {
    return (
      <InfoModal
        onClick={() => { setPlayerStatisticsModal() }}
        customModal={
          <div className={mobile ? styles.playerStatisticsModalMobile : styles.playerStatisticsModal}>
            <p id='titleText'>{playerStatisticsModal.title}</p>
            <p id='descriptionText'>{playerStatisticsModal.description}</p>
          </div>
        }
      />
    )
  }

  return (
    <div className={style} onClick={(e) => { handleClick(e) }}>
      <p>{content}</p>
      {playerStatisticsModal && <PlayerStatisticsModal />}
    </div>
  )
}