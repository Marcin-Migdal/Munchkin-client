import { makeStyles } from "@material-ui/core";

export const roomMenuClasses = makeStyles(theme => ({
  roomMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
  },

  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90vw',
    marginTop: '10vh',
  },

  roomNameText: {
    fontSize: '4vh',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main,
  },

  text: {
    marginTop: '0.5vh',
    fontSize: '3vh',
    color: theme.palette.primary.main,
  },

  input: {
    '& .MuiTextField-root': {
      width: '50vw',
    },

    '& .MuiInputBase-root': {
      height: '37px',
      borderRadius: '8px',
      color: theme.palette.primary.main,
    },
  },

  button: {
    width: '18vw',
    height: '37px',
    marginLeft: '2vw',
    borderRadius: '8px',
    fontSize: '3vw',
    fontWeight: 600,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  },

  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    width: '90vw',
    marginTop: '1.25vh',
  },

  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '0.75vh',
  },

  notificationText: {
    width: '100%',
    textAlign: 'center',
    margin: '0.15vh',
    fontSize: '1.65vh',
    color: theme.palette.primary.main,
  },

  playersContainer: {
    marginTop: '0.75vh',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  playerText: {
    fontSize: '2.5vh',
    color: theme.palette.primary.main,
  },

  iconContainer: {
    padding: '1vh',
    fontSize: '3vh',
    position: 'absolute',
    top: 0,
    left: '3vh',
    '& :hover': {
      borderRadius: '6px',
      backgroundColor: theme.palette.primary.main,
    }
  },
}))