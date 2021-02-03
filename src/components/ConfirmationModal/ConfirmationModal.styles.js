import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  container: {
    width: '14vw',
    borderRadius: '8px',
    fontSize: '1.25vw',
    padding: '0.5vw',
    textAlign: 'center',
    position: 'fixed',
    left: '42.5vw',
    bottom: '45%',
    zIndex: 4,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.default
  },

  buttonContainer: {
    marginTop: '1vh',
  },

  button: {
    margin: '0 0.5vw',
    fontSize: '0.8vw',
    borderRadius: '8px',
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  }
}));