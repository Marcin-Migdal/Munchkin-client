import { makeStyles } from "@material-ui/core";

export const roomMenuClasses = makeStyles(theme => ({
  roomMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '52vw',
  },

  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: '10vh 0 1.5vh 0',
  },

  roomNameText: {
    width: '100%',
    textAlign:'center',
    marginBottom: '0.5vh',
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
    alignItems: 'center',
    width: '100%',
  },

  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0.85vh',
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