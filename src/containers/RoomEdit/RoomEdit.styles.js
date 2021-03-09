import { makeStyles } from "@material-ui/core";

export const roomEditClasses = makeStyles(theme => ({
  roomEditContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10vh',
  },

  text: {
    fontSize: '4.5vh',
    marginBottom: '1.5vh',
    color: theme.palette.primary.main,
  },

  input: {
    '& .MuiTextField-root': {
      width: '20vw',
      marginBottom: '1vh',
    },

    '& .MuiInputBase-root': {
      borderRadius: '8px',
      color: theme.palette.primary.main,
    },
  },

  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '18vw',
    marginTop: '1vh',
  },

  deleteButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '10vw',
    marginTop: '1vh',
  },

  button: {
    width:'4.5vw',
    borderRadius: '8px',
    fontSize: '0.85vw',
    fontWeight: 600,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  },

  notificationText: {
    width: 'fit-content',
    textAlign: 'center',
    margin: '0.15vh',
    fontSize: '2.5vh',
    color: theme.palette.primary.main,
  },

}))