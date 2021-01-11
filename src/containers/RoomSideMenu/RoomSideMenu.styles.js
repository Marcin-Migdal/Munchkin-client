import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  roomSideMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    margin: '7vh 0 0 0',
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '14vw',
    '& .MuiButton-root': {
      width: '11vh'
    }
  },

  button: {
    margin: '0.75vh 0 1.75vh 0',
    borderRadius: '6px',
    fontSize: '0.80vw',
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  },

  text: {
    textAlign: 'center',
    margin: '0.75vh 0',
    fontSize: '2.65vh',
    color: theme.palette.secondary.main,
  },

  roomNameText: {
    textAlign: 'center',
    width: '90%',
    marginTop: '1vh',
    fontSize: '3vh',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.secondary.main,
  },

  notificationText: {
    width: '90%',
    textAlign: 'center',
    marginBottom: '1.75vh',
    fontSize: '2.5vh',
    color: theme.palette.secondary.main,
  },

  playersContainer: {
    display:'flex',
    flexDirection:'column',
    width:'100%',
    marginTop: '1.75vh',
  },

  playerText: {
    fontSize: '2.5vh',
    color: theme.palette.secondary.main,
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

  input: {
    '& .MuiTextField-root': {
      width: '16vw',
      margin: '1vh 0',
    },

    '& .MuiInputBase-root': {
      borderRadius: '8px',
      color: theme.palette.secondary.main,
    },
  },
}));