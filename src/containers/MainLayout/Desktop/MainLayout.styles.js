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
    backgroundColor: theme.palette.background.main,
  },

  bottomContainerSideMenu: {
    display: 'flex',
    flexDirection: 'row',
    height: '94vh',
    width: '100vw',
  },

  sideMenuContainerEnabled: {
    height: '100%',
    width: '18vw',
    position: 'fixed',
    transition: '300ms',
    left: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.main,
  },

  sideMenuContainerDisabled: {
    height: '100%',
    width: '18vw',
    position: 'fixed',
    transition: '600ms',
    left: '-100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.main,
  },

  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  }
}));






