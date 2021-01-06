import { makeStyles } from "@material-ui/core";

export const mobileClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  searchInput: {
    height: '4.5vh',
    width: '70vw',
    padding: '0 0.75vh',
    border: '0px',
    borderRadius: '8px',
    fontSize: '2vh',
    '&:focus': {
      outline: 'none'
    }
  },

  searchContent: {
    width: '70vw',
    height: 'fit-content',
    padding: '0 1vh 1vh 1vh',

    border: 'solid',
    borderWidth: '0 2px 2px 2px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',

    position: 'fixed',
    top: '8vh',
    zIndex: 3,

    borderColor: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main
  },

  searchError: {
    width: '70vw',
    height: 'fit-content',
    padding: '1vh',
    textAlign: 'center',

    border: 'solid',
    borderWidth: '0 2px 2px 2px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',

    position: 'fixed',
    top: '8vh',
    zIndex: 3,
    fontSize: '2.25vh',
    color: theme.palette.primary.main,

    borderColor: theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main
  },
}))