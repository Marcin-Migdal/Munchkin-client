import { makeStyles } from "@material-ui/core";

export const desktopClasses = makeStyles( theme => ({
  backgroundLayer: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    height: '84vh',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },

  title: {
    position:'absolute',
    top:'1vh',
    left:'45%',
    fontSize: '5vh',
    color: theme.palette.primary.main,
  },
  
  description: {
    display: 'inline-block',
    width: '65vh',
    fontSize: '2.5vh',
    color: theme.palette.secondary.main,
  },

  button: {
    fontWeight: 600,
    width: '16.5vh',
    margin: '3vh 1.5vh',
    color: theme.palette.primary.main,
  },
}));