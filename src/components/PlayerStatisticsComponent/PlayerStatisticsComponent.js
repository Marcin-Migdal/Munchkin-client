import { useTheme } from '@material-ui/core';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import InfoModal from '../InfoModal/InfoModal';
import { classes } from './PlayerStatisticsComponent.styles'

export default function PlayerStatisticsComponent({ style, content, type, mobile, isCurrentPlayer }) {
  const { t } = useTranslation();

  const theme = useTheme();

  const [modalType, setModalType] = useState('inGame');
  const [playerStatisticsModal, setPlayerStatisticsModal] = useState();

  const styles = classes(isCurrentPlayer ? theme.palette.current : theme.palette.primary, modalType)();

  const handleClick = (e) => {
    e.stopPropagation();
    switch (type) {
      case 'level':
        setPlayerStatisticsModal({
          title: t('game:playerStatistics.title.level'),
          description: t('game:playerStatistics.description.level')
        })
        break;
      case 'bonus':
        setPlayerStatisticsModal({
          title: t('game:playerStatistics.title.bonus'),
          description: t('game:playerStatistics.description.bonus')
        })
        break;
      case 'power':
        setPlayerStatisticsModal({
          title: t('game:playerStatistics.title.power'),
          description: t('game:playerStatistics.description.power')
        })
        break;
      case 'sideMenu':
        setPlayerStatisticsModal({
          title: t('game:playerStatistics.title.level'),
          description: t('game:playerStatistics.description.level')
        })
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