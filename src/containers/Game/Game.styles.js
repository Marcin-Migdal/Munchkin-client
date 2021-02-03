import { makeStyles } from "@material-ui/core";

export const gameClasses = makeStyles(theme => ({
  scrollContainer: {
    zIndex: 1,
  },

  scrollContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100vw',
    height: '100%',
  },

  roomNameText: {
    fontSize: '4vh',
    marginBottom: '2vh',
    color: theme.palette.primary.main
  },

  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '7vh',
  },

  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    marginTop: '5vh',
  },

  bottomTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '0.5vh',
  },

  playerStatusButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '4vh',
    '& #leftButton': {
      borderTopLeftRadius: '16px',
      borderBottomLeftRadius: '16px',
    },
    '& #middleButton': {
      borderRadius: '0',
    },
    '& #rightButton': {
      borderTopRightRadius: '16px',
      borderBottomRightRadius: '16px',
    }
  },

  button: {
    margin: '0 0.25vh',
    fontSize: '2.5vh',
  },

  text: {
    fontSize: '2.5vh',
    color: theme.palette.primary.main
  },

  bottomButtonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '1vh 0 5vh 0',
  },

  playerStatusButton: {
    height: '4vh',
    borderRadius: '24px',
    color: theme.palette.secondary.main,
    '&#save': {
      fontSize: '2vh',
    },
    '&#reload': {
      fontSize: '2.75vh',
    }
  },

  loaderContainer: {
    position: 'fixed',
    top: '40vh',
    left: '49vw',
  }
}))