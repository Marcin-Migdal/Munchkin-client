import { makeStyles } from "@material-ui/core";

export const classes = makeStyles( theme => ({
  containerDesktop: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '84vh',
    margin: '8vh 0',
    backgroundColor: theme.palette.background.default,
  },

  containerMobile: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
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
    fontSize: '2vh',
    color: theme.palette.secondary.main,
  },
}));