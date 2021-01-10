import { makeStyles } from "@material-ui/core";

export const roomEditClasses = makeStyles(theme => ({
  roomEditConteiner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '52vw',
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

  buttonsConteiner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '15vw',
    marginTop: '1vh',
  },

  deleteButtonsConteiner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '10vw',
    marginTop: '1vh',
  },

  button: {
    width:'4.5vw',
    borderRadius: '8px',
    fontSize: '1.75vh',
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