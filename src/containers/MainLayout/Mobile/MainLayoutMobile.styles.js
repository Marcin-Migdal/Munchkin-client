import { makeStyles } from "@material-ui/core";

export const classes = makeStyles( theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  topContainer: {
    height:'8vh',
    backgroundColor:'red'
  },

  bottomContainer: {
    display:'flex',
    height:'92vh',
    width:'100vw'
  },

  sideMenuEnabled: {
    display: 'flex',
    justifyContent: 'center',
    width: '90vw',
    height: '100%',
    position: 'fixed',
    left: 0,
    transition: '150ms',
    backgroundColor: theme.palette.background.default,
  },

  sideMenuDisabled: {
    width: '250px',
    height: '100vh',
    position: 'fixed',
    left: '-100%',
    transition: '350ms',
    backgroundColor: theme.palette.background.default,
  },

  contentContainer: {
    height:'92vh',
    width:'100%',
    backgroundColor:'yellow'
  },
}));








