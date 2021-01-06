import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  navbarContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    fontSize: '4vh',
  },

  menuIcon: {
    marginLeft: '1.7vh',
  },

  searchIcon:{
    marginRight: '1.7vh',
    position:'fixed',
    right:'0',
    fontSize:'4vh',
  },

  text: {
    fontSize: '4vh',
    marginLeft: '1vh',
    color: theme.palette.secondary.main,

    webkitRouchCallout: 'none',
    webkitUserSelect: 'none',
    khtmlUserSelect: 'none',
    mozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
  },
}));






