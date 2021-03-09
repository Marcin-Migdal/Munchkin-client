import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  navbarContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: '8vw',
  },

  menuIcon: {
    marginLeft: '3.4vw',
  },

  searchIcon: {
    marginRight: '3.4vw',
    position: 'fixed',
    right: '0',
  },

  closeSearchIcon: {
    marginLeft: '2.25vw',
    position: 'fixed',
    left: '0',
    zIndex: 1,
  },

  text: {
    fontSize: '8vw',
    marginLeft: '2vw',
    color: theme.palette.secondary.main,

    webkitRouchCallout: 'none',
    webkitUserSelect: 'none',
    khtmlUserSelect: 'none',
    mozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
  },
}));






