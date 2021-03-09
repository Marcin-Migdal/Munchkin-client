import { makeStyles } from "@material-ui/core";

export const homePageClasses = makeStyles(theme => ({
  wideContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90vh',
    width: '100vw',
  },

  title: {
    margin: '5vh 0 2vh 0',
    fontSize: '6vh',
    fontWeight: 500,
    color: theme.palette.primary.main,
  },

  description: {
    width: '90vw',
    marginBottom: '5vh',
    fontSize: '2.5vh',
    textAlign: 'center',
    color: theme.palette.primary.main,
  }
}));