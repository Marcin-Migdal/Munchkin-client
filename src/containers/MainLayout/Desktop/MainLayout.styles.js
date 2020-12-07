import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  topContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '7vh',
    backgroundColor: theme.palette.background.default,
  },

  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '93vh',
    width: '100vw'
  },

  LeftContainerEnabled: {
    height: '100%',
    width: '23vw',
    backgroundColor: 'green'
  },

  LeftContainerDisabled: {
    height: '100%',
    width: '0vw',
  },

  rightContainer: {
    height: '100%',
    width: '100%',
  },
}));






