import { makeStyles } from "@material-ui/core";

export const roomsClasses = makeStyles(theme => ({
  scrollContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    height: '92vh',
    zIndex: 1,
  },

  topScrollContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10vh 0 0.5vh 0',
    width: '52vw',
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

  topButton: {
    fontSize: '1.75vh',
    borderRadius: '8px',
    fontWeight: 600,
  },

  button: {
    fontSize: '1.75vh',
    borderRadius: '8px',
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },

  roomSideMenuEnabled: {
    width: '18vw',
    height: '98vh',
    position: 'fixed',
    transition: '300ms',
    top: '6vh',
    right: 0,
    backgroundColor: theme.palette.background.main,
  },

  roomSideMenuDisabled: {
    width: '32ch',
    height: '98vh',
    position: 'fixed',
    transition: '600ms',
    top: '6vh',
    right: '-100%',
    backgroundColor: theme.palette.background.main,
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