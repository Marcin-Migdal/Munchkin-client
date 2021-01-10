import { makeStyles } from "@material-ui/core";

export const roomEditClasses = makeStyles(theme => ({
  roomEditContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
  },

  text: {
    margin: '10vh 0 1.5vh 0',
    fontSize: '4vh',
    color: theme.palette.primary.main,
  },

  input: {
    '& .MuiTextField-root': {
      marginBottom: '1vh',
      width: '50vw',
    },

    '& .MuiInputBase-root': {
      height: '37px',
      borderRadius: '8px',
      color: theme.palette.primary.main,
    },
  },

  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50vw',
    marginTop: '0.5vh',
  },

  deleteButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '33vw',
    marginTop: '0.5vh',
  },

  button: {
    width: '15vw',
    height: '37px',
    borderRadius: '8px',
    fontSize: '3vw',
    fontWeight: 600,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  },

  notificationText: {
    width: '100%',
    textAlign: 'center',
    marginTop: '0.5vh',
    fontSize: '1.65vh',
    color: theme.palette.primary.main,
  },
}))