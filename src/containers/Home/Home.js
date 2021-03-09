import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTranslation } from 'react-i18next';
import ListComponent from '../../components/ListComponent/ListComponent';
import { links } from '../../utils/linkUtils';
import { useSelector } from 'react-redux';
import { layoutSelector } from '../../slices/layout';
import { useTheme } from '@material-ui/core';
import { IconContext } from 'react-icons/lib';
import HomePageComponent from '../../components/HomePageComponent/HomePageComponent';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default function Home({ classes }) {
  const theme = useTheme();
  const { t } = useTranslation(['home']);
  const { layout } = useSelector(layoutSelector)

  const iconFolder = layout.mobile ? 'mobile' : 'desktop'

  const styles = classes();

  const contentArray = [
    [
      {
        title: t('home:title.rooms'),
        buttonText: t('home:title.rooms'),
        url: links.rooms,
        imagePath: '/images/' + iconFolder + '/rooms.png',
        description: t('home:description.rooms'),
      },
      {
        title: t('home:title.sortRooms'),
        buttonText: t('home:title.rooms'),
        url: links.rooms,
        imagePath: '/images/' + iconFolder + '/sortRooms.png',
        description: t('home:description.sortRooms'),
      }
    ],
    [
      {
        title: t('home:title.room'),
        imagePath: '/images/' + iconFolder + '/room.png',
        description: t('home:description.room'),
      },
      {
        title: t('home:title.editRoom'),
        imagePath: '/images/' + iconFolder + '/editRoom.png',
        description: t('home:description.editRoom'),
      }
    ],
    [
      {
        title: t('home:title.game'),
        imagePath: '/images/' + iconFolder + '/game.png',
        description: t('home:description.game'),
      },
      {
        title: t('home:title.extendedGame'),
        imagePath: '/images/' + iconFolder + '/extendedGame.png',
        description: t('home:description.extendedGame'),
      },
      {
        title: t('home:title.SwitchClassGame'),
        imagePath: '/images/' + iconFolder + '/switchClassGame.png',
        description: t('home:description.SwitchClassGame'),
      },
    ],
    [
      {
        title: t('home:title.gameSummary'),
        imagePath: '/images/' + iconFolder + '/gameSummary.png',
        description: t('home:description.gameSummary'),
      },
      {
        title: t('home:title.extendedGame'),
        imagePath: '/images/' + iconFolder + '/extendedSummary.png',
        description: t('home:description.extendedSummary'),
      },
    ],
    [
      {
        title: t('home:title.searchBar'),
        imagePath: '/images/' + iconFolder + '/searchBar.png',
        description: t('home:description.searchBar'),
      },
      {
        title: t('home:title.searchResult'),
        imagePath: '/images/' + iconFolder + '/searchResult.png',
        description: t('home:description.searchResult'),
      },
    ],
    [
      {
        title: t('home:title.settings'),
        buttonText: t('home:title.settings'),
        url: links.settings,
        imagePath: '/images/' + iconFolder + '/settings.png',
        description: t('home:description.settings'),
      }
    ]
  ]

  return (
    <div >
      <PerfectScrollbar>
        <div className={!layout.mobile && layout.sideMenuActive ? styles.slimContainer : styles.wideContainer}>
          <p className={styles.title}>Munchtrack</p>
          <span className={styles.description}>
            {t('home:mainTitle')}
          </span>
          <IconContext.Provider value={{ color: theme.palette.primary.main }}>
            <ListComponent data={contentArray} mapFunction={(content, index) => {
              return (
                <HomePageComponent
                  key={index}
                  content={content}
                  index={index}
                  sideMenuActive={layout.sideMenuActive}
                  mobile={layout.mobile} />
              )
            }} />
          </IconContext.Provider>
        </div>
      </PerfectScrollbar>
    </div>
  )
} 