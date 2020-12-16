import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  roomSideMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  textContainer: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:'90%',
    margin: '7vh 0 1.5vh 0',
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    '& .MuiButton-root': {
      width: '6.5vw'
    }
  },

  button: {
    marginTop: '1.5vh',
    borderRadius: '6px',
    fontSize: '0.9vw',
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  },

  text: {
    textAlign:'center',
    marginTop:'1vh',
    fontSize: '1.75vw',
    color: theme.palette.secondary.main,
  },

  notificationText: {
    width: '90%',
    textAlign:'center',
    marginTop: '1vh',
    fontSize: '1.25vw',
    color: theme.palette.secondary.main,
  },
}));