import { makeStyles } from "@material-ui/core";

export const roomsClasses = makeStyles(theme => ({
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '91vh',
    zIndex: 1,
  },
  
  scrollContentContainer:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
  },

  topScrollContainer: {
    marginTop: '10vh',
    width: '90vw'
  },

  bottomScrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '1.25vh',
  },

  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  addRoomButton: {
    fontSize: '1.75vh',
    borderRadius: '8px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  button: {
    fontSize: '1.75vh',
    borderRadius: '8px',
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },

  roomSideMenuEnabled: {
    width: '70vw',
    height: '100%',
    position: 'fixed',
    transition: '100ms',
    right: 0,
    top: '16vw',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },

  roomSideMenuDisabled: {
    width: '70vw',
    height: '100%',
    position: 'fixed',
    transition: '200ms',
    right: '-100%',
    top: '8vh',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },

  iconContainer: {
    padding: '1vh',
    fontSize: '4vh',
    position: 'absolute',
    top: 0,
    left: 0,
    '& :hover': {
      borderRadius: '6px',
      backgroundColor: theme.palette.primary.main,
    }
  },
}));