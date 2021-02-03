import { makeStyles } from "@material-ui/core";

export const gameClasses = makeStyles(theme => ({
  scrollContainer: {
    height: '91vh',
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
    width: '90vw',
    marginBottom: '2vh',
    textAlign: 'center',
    fontSize: '4vh',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main,
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
    margin: '5vh 0',
  },

  bottomTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  playerStatusButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '4vh',
    '& #leftButton': {
      borderTopLeftRadius: '30px',
      borderBottomLeftRadius: '30px',
    },
    '& #middleButton': {
      borderRadius: '0',
    },
    '& #rightButton': {
      borderTopRightRadius: '30px',
      borderBottomRightRadius: '30px',
    }
  },

  button: {
    width: '18vw',
    height: '4vh',
    margin: '0 0.5vw',
    fontSize: '3.5vh',
  },

  text: {
    fontSize: '3vh',
    color: theme.palette.primary.main
  },

  bottomButtonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '1vh 0',
  },

  playerStatusButton: {
    color: theme.palette.secondary.main,
    height: '4vh',
    borderRadius: '30px',
    '&#save': {
      fontSize: '2.25vh',
    },
    '&#reload': {
      padding: '0 4vw',
      fontSize: '3vh',
    }
  },

  loaderContainer: {
    position: 'fixed',
    top: '30vh',
    left: '45vw',
  }
}))