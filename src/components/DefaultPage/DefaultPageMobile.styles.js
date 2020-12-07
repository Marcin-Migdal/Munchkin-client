import { makeStyles } from "@material-ui/core";

export const mobileClasses = makeStyles( theme => ({
  backgroundLayer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },

  title: {
    position:'absolute',
    top:'10vh',
    fontSize: '5.5vh',
    color: theme.palette.secondary.main,
  },
  
  description: {
    textAlign: 'center',
    width: '75vw',
    marginTop:'55%',
    fontSize: '2.5vh',
    color: theme.palette.secondary.main,
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '3vh',
  },

  button: {
    fontWeight: 600,
    fontSize: '1.4vh',
    width: '27vw',
    color: theme.palette.primary.main,
    margin: '1vh 0'
  },
}));