import { makeStyles } from "@material-ui/core";

export const classes = makeStyles( theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  topContainer: {
    display: 'flex',
    alignItems: 'center',
    height:'8vh',
    width:'100vw',
    position:'fixed',
    top:0,
    
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },

  bottomContainer: {
    display:'flex',
    height:'92vh',
    width:'100vw',
    marginTop:'8vh',
  },

  sideMenuEnabled: {
    width: '90vw',
    height: '100%',
    position: 'fixed',
    transition: '100ms',
    left: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },

  sideMenuDisabled:{
    width: '90vw',
    height: '100%',
    position: 'fixed',
    transition: '200ms',
    left: '-100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },

  contentContainer: {
    zIndex: 1,
    height: '100%',
    width:'100%',
  },
}));








