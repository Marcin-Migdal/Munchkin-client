import { makeStyles } from "@material-ui/core";

export const classes = makeStyles( theme => ({
  navbarContainer: {
    display:'flex',
    alignItems:'center',
    marginLeft: '1.5vh',
    fontSize: '4vh',
  },

  text:{
    fontSize: '3.5vh',
    marginLeft: '0.5vh',
    color: theme.palette.secondary.main,
  },
}));






