import { makeStyles } from "@material-ui/core";

export const roomClasses = makeStyles(theme => ({
  roomMenuContainer: {
    display: 'flex',
    alignItems:'center',
    flexDirection: 'column',
  },

  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '10vh',
  },

  roomNameText: {
    marginBottom: '0.5vh',
    width: '100%',
    textAlign:'center',
    fontSize: '5vh',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main,
  },

  text: {
    fontSize: '3.5vh',
    color: theme.palette.primary.main,
  },

  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0.85vh',
  },

  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '1.5vh',
  },

  input: {
    '& .MuiTextField-root': {
      width: '20vw',
    },

    '& .MuiInputBase-root': {
      borderRadius: '8px',
      color: theme.palette.primary.main,
    },
  },

  button: {
    marginLeft: '1vh',
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

  playersContainer: {
    marginTop: '0.85vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}))