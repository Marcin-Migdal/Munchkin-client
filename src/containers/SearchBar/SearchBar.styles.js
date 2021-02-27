import { makeStyles } from "@material-ui/core";

export const desktopClasses = makeStyles(theme => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '12vw',
  },

  searchBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    height: '3.75vh',
    width: '20vw',
    padding: '0 0.5vw',
    border: '0px',
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    fontSize: '1.75vh',
    '&:focus': {
      outline: 'none'
    }
  },

  searchButton: {
    height: '3.75vh',
    width: '3.5vw',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    '&.MuiButton-root': {
      borderWidth: '0 0 0 0.2vh',
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    }
  },

  icon: {
    fontSize: '3vh'
  },

  searchContent: {
    width: '20vw',
    height: 'fit-content',
    padding: '0 1vh 1vh 1vh',

    border: 'solid',
    borderWidth: '0 2px 2px 2px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',

    position: 'absolute',
    top: '5vh',
    left: 0,
    zIndex: 3,

    borderColor: theme.palette.background.main,
    backgroundColor: theme.palette.secondary.main
  },

  searchError: {
    width: '20vw',
    height: 'fit-content',
    padding: '1vh',
    textAlign: 'center',

    border: 'solid',
    borderWidth: '0 2px 2px 2px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',

    position: 'absolute',
    top: '5vh',
    left: 0,
    zIndex: 3,
    
    fontSize: '2.5vh',
    color: theme.palette.primary.main,

    borderColor: theme.palette.background.main,
    backgroundColor: theme.palette.secondary.main
  },
}))