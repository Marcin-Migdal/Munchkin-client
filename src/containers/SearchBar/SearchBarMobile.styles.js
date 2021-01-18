import { makeStyles } from "@material-ui/core";

export const mobileClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },

  searchBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    height: '4.5vh',
    width: '60vw',
    padding: '0 1vh',
    border: '0px',
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    fontSize: '2vh',
    '&:focus': {
      outline: 'none'
    }
  },
  
  searchButton: {
    height: '4.5vh',
    width: '12vw',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
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
    width: '72vw',
    height: 'fit-content',
    padding: '0 1vh 1vh 1vh',

    border: 'solid',
    borderWidth: '0 2px 2px 2px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',

    position: 'absolute',
    top: '6.25vh',
    left: '14vw',
    zIndex: 3,

    borderColor: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main
  },

  searchError: {
    width: '72vw',
    height: 'fit-content',
    padding: '1vh',
    textAlign: 'center',

    border: 'solid',
    borderWidth: '0 2px 2px 2px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',

    position: 'absolute',
    top: '6.25vh',
    left: '14vw',
    zIndex: 3,

    fontSize: '2.25vh',
    color: theme.palette.primary.main,
  
    borderColor: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main
  },
}))