import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  containerDesktop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '84vh',
    margin: '8vh 0',
    backgroundColor: theme.palette.background.default,
  },

  containerMobile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: 'fit-content',
  },

  title: {
    fontSize: '5vh',
    marginBottom: '2vh',
    color: theme.palette.secondary.main,
  },

  genderRadioContainer: {
    width: '100%',
  },

  button: {
    fontWeight: 600,
    margin: '2vh',
    color: theme.palette.primary.main,
  },

  errorBadCredentials: {
    fontSize: '2vh',
    color: theme.palette.secondary.main,
  },
}));