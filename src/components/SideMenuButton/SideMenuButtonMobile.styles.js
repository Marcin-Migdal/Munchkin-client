import { makeStyles } from "@material-ui/core";

export const mobileClasses = makeStyles(theme => ({
  sideMenuItem: {
    display: 'flex',
    alignItems: 'center',
    height: '7vh',
    width: '86vw',
    margin: '2vw',
    padding: '2vw',
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