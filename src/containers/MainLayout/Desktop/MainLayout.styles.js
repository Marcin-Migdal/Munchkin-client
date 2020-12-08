import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  topContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '6vh',
    backgroundColor: theme.palette.background.default,
  },

  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '94vh',
    width: '100vw'
  },

  LeftContainerEnabled: {
    height: '100%',
    width:'18vw',
  },

  LeftContainerDisabled: {
    height: '100%',
    width: '0vw',
  },

  rightContainer: {
    height: '100%',
    width: '82vw',
  },
}));






