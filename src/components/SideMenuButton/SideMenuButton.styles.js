import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  sideMenuItem: {
    display: 'flex',
    alignItems: 'center',
    height: '7vh',
    width: '95%',
    margin: '1vh 1vh',
    padding: '1vh 2vh',
    fontSize: '3.5vh',
    borderRadius: '8px',
    color: '#ffffff',
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    webkitRouchCallout: 'none',
    webkitUserSelect: 'none',
    khtmlUserSelect: 'none',
    mozUserSelect: 'none',
    msUserSelect: 'none',
    userSelect: 'none',
  },

  sideMenuItemText: {
    marginLeft: '1.3vh',
    fontSize: '3vh',
  },
}));