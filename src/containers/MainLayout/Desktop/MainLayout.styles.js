import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  topContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '6vh',
    backgroundColor: theme.palette.background.default,
  },

  bottomConteinerSideMenuEnabled: {
    display: 'flex',
    flexDirection: 'row',
    height: '94vh',
    width: '100vw',
    '& #sideMenuConteiner': {
      transition: '300ms',
      left: 0,
    },
    '& #contentConteiner': {
      marginLeft: '6vw'
    }
  },

  bottomConteinerSideMenuDisabled: {
    display: 'flex',
    flexDirection: 'row',
    height: '94vh',
    width: '100vw',
    '& #sideMenuConteiner': {
      transition: '600ms',
      left: '-100%',
    },
  },

  sideMenuConteiner: {
    height: '100%',
    width: '18vw',
    position: 'fixed',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },

  contentConteiner: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  }
}));






