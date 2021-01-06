import { makeStyles } from "@material-ui/core";

export const roomClasses = makeStyles(theme => ({
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '92vh',
    zIndex: 1,
  },

  topScrollContainer: {
    margin: '10vh 0 0.5vh 0',
    width: '52vw'
  },

  roomListContainer:{
    width: '52vw'
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
    width: '32ch',
    height: '98vh',
    position: 'fixed',
    transition: '300ms',
    top: '6vh',
    right: 0,
    backgroundColor: theme.palette.background.default,
  },

  roomSideMenuDisabled: {
    width: '32ch',
    height: '98vh',
    position: 'fixed',
    transition: '600ms',
    top: '6vh',
    right: '-100%',
    backgroundColor: theme.palette.background.default,
  },

  iconContainer: {
    padding: '1vh',
    fontSize: '3vh',
    position: 'absolute',
    top: 0,
    left: 0,
    '& :hover': {
      borderRadius: '6px',
      backgroundColor: theme.palette.primary.main,
    }
  },
}))