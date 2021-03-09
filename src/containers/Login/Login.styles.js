import { makeStyles } from "@material-ui/core";

export const classes = makeStyles( theme => ({
  containerDesktop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '84vh',
    margin: '8vh 0',
    backgroundColor: theme.palette.background.main,
  },

  containerMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.main,
  },

  button: {
    fontWeight: 600,
    margin: '2vh',
    color: theme.palette.primary.main,
  },

  title: {
    fontSize: '5vh',
    marginBottom: '2vh',
    color: theme.palette.secondary.main,
  },

  errorBadCredentials: {
    fontSize: '2.5vh',
    color: theme.palette.secondary.main,
  },
}));