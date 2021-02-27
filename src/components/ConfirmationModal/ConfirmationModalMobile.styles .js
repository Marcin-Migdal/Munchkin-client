import { makeStyles } from "@material-ui/core";

export const mobileClasses = makeStyles(theme => ({
  container: {
    width: '35vw',
    borderRadius: '8px',
    fontSize: '1.5vh',
    padding: '0.5vh',
    textAlign: 'center',
    position: 'fixed',
    left: '32.5vw',
    bottom: '50%',
    zIndex: 4,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.main
  },

  buttonContainer: {
    margin: '0.75vh 0 0.5vh 0',
  },

  button: {
    margin: '0 0.5vw',
    fontSize: '1vh',
    borderRadius: '8px',
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  }
}));