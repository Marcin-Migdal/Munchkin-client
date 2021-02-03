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
    height: '9vw',
    width: '60vw',
    padding: '0 2vw',
    border: '0px',
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    fontSize: '4vw',
    '&:focus': {
      outline: 'none'
    }
  },
  
  searchButton: {
    height: '9vw',
    width: '12vw',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
    '&.MuiButton-root': {
      borderWidth: '0 0 0 0.4vw',
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    }
  },

  icon: {
    fontSize: '6vw'
  },

  searchContent: {
    width: '72vw',
    height: 'fit-content',
    padding: '0 2vw 2vw 2vw',

    border: 'solid',
    borderWidth: '0 2px 2px 2px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',

    position: 'absolute',
    top: '12.5vw',
    left: '14vw',
    zIndex: 3,

    borderColor: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main
  },

  searchError: {
    width: '72vw',
    height: 'fit-content',
    padding: '2vw',
    textAlign: 'center',

    border: 'solid',
    borderWidth: '0 2px 2px 2px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',

    position: 'absolute',
    top: '12.5vw',
    left: '14vw',
    zIndex: 3,

    fontSize: '4.5vw',
    color: theme.palette.primary.main,
  
    borderColor: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main
  },
}))