import { makeStyles } from "@material-ui/core";

export const mobileClasses = makeStyles(theme => ({
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
    width: '90%',
    '& .MuiButton-root': {
      width: '12vh'
    }
  },

  button: {
    margin: '0.75vh 0 1.75vh 0',
    borderRadius: '8px',
    fontSize: '1.75vh',
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  },

  text: {
    textAlign: 'center',
    marginTop: '1vh',
    fontSize: '3.25vh',
    color: theme.palette.secondary.main,
  },

  roomNameText: {
    textAlign: 'center',
    width: '90%',
    marginTop: '1vh',
    fontSize: '3.25vh',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.secondary.main,
  },

  notificationText: {
    width: '90%',
    textAlign: 'center',
    marginBottom: '1.75vh',
    fontSize: '2.25vh',
    color: theme.palette.secondary.main,
  },

  playersContainer: {
    marginTop: '1.75vh',
  },

  playerText: {
    fontSize: '2.5vh',
    color: theme.palette.secondary.main,
  },

  iconContainer: {
    padding: '1vh',
    borderRadius: '6px',
    fontSize: '4vh',
    position: 'absolute',
    top: 0,
    left: '4vh',
    '& :hover': {
      borderRadius: '6px',
      backgroundColor: theme.palette.primary.main,
    }
  },
}));