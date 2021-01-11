import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  containerDesktop: {
    width: '20vw',
    borderRadius: '8px',
    fontSize: '1.5vw',
    padding: '0.5vw',
    textAlign: 'center',
    position: 'fixed',
    bottom: '50%',
    zIndex: 4,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.default
  },

  containerMobile: {
    width: '20vh',
    borderRadius: '8px',
    fontSize: '1.5vh',
    padding: '0.5vh',
    textAlign: 'center',
    position: 'fixed',
    bottom: '50%',
    zIndex: 4,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.default
  },
}));