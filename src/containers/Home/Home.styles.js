import { makeStyles } from "@material-ui/core";

export const homePageClasses = makeStyles(theme => ({
  slimContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '94vh',
    width: '82vw',
    marginLeft: '18vw',
  },

  wideContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '94vh',
    width: '100vw',
  },

  title: {
    margin: '5vh 0 3vh 0',
    fontSize: '7vh',
    fontWeight: 500,
    color: theme.palette.primary.main,
  },

  description: {
    width: '60vw',
    marginBottom: '6vh',
    fontSize: '3vh',
    textAlign: 'center',
    color: theme.palette.primary.main,
  }
}));