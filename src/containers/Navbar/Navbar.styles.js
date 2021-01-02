import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  navbarContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1.7vh',
    fontSize: '4vh',
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






