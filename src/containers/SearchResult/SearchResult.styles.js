import { makeStyles } from "@material-ui/core";

export const SearchResultClasses = makeStyles(theme => ({
  scrollContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    height: '92vh',
    zIndex: 1,
  },

  title: { 
    margin: '8vh 0 1vh',
    fontSize: '5vh',
    color: theme.palette.primary.main,
  },

  topScrollContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0 0 0.5vh 0',
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