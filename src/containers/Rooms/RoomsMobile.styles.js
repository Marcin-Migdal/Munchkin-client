import { makeStyles } from "@material-ui/core";

export const roomClasses = makeStyles(theme => ({
  scrollContainer: {
    width: '100%',
    height: '92vh',
    zIndex: 1,
  },

  topScrollContainer: {
    marginTop: '13vh',
    width: '90vw'
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
    top: '8vh',
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
    borderRadius: '6px',
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