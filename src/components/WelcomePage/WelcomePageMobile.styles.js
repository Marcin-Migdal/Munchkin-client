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
    backgroundColor: theme.palette.background.main,
  },

  title: {
    position:'absolute',
    top:'10vh',
    fontSize: '6vh',
    color: theme.palette.secondary.main,
  },
  
  description: {
    textAlign: 'center',
    width: '75vw',
    marginTop:'50%',
    fontSize: '2.5vh',
    color: theme.palette.secondary.main,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3vh',
  },

  button: {
    fontWeight: 600,
    fontSize: '1.4vh',
    width: '32vw',
    color: theme.palette.primary.main,
    margin: '0.75vh 0'
  },

  sesionExpiredText: {
    width:'55vw',
    textAlign:'center',
    fontSize: '2vh',
    color: theme.palette.secondary.main,
  }
}));