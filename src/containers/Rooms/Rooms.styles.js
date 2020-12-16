import { makeStyles } from "@material-ui/core";

export const roomClasses = makeStyles(theme => ({
  scrollContainer: {
    width: '100%',
    height: '92vh',
    zIndex: 1,
  },

  topScrollContainer: {
    margin: '10vh 0 0.5vh 0',
    width: '52vw'
  },

  scrollContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  bottomScrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '1.25vh',
  },

  roomSideMenuEnabled: {
    width: '18vw',
    height: '98vh',
    position: 'fixed',
    transition: '300ms',
    top: '6vh',
    right: 0,
    backgroundColor: theme.palette.background.default,
  },

  roomSideMenuDisabled: {
    width: '18vw',
    height: '98vh',
    position: 'fixed',
    transition: '600ms',
    top: '6vh',
    right: '-100%',
    backgroundColor: theme.palette.background.default,
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

  iconContainer: {
    padding: '1vh',
    borderRadius: '6px',
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