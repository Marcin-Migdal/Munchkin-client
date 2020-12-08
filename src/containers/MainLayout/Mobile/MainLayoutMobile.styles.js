import { makeStyles } from "@material-ui/core";

export const classes = makeStyles( theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  topContainer: {
    display: 'flex',
    alignItems: 'center',
    height:'8vh',
    backgroundColor: theme.palette.background.default,
  },

  bottomContainer: {
    display:'flex',
    height:'92vh',
    width:'100vw'
  },

  contentContainer: {
    height:'92vh',
    width:'100%',
  },
}));








