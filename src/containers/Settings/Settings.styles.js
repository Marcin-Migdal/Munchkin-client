import { makeStyles } from "@material-ui/core";

export const settingsClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    marginTop: '10vh',
  },

  title: {
    width: '100vw',
    textAlign: 'center',
    marginBottom: '10vh',
    fontSize: '6vh',
    color: theme.palette.primary.main,
  },

  showSegmentButton: {
    justifyContent: 'space-between',
    width: '44vw',
    margin: '1vh 0 1vh 28vw',
    borderRadius: '8px',
    fontSize: '1.25vw',
    color: theme.palette.background.default,
    '&.MuiButton-text': {
      padding: '3px 8px',
    }
  },

  customHr: {
    height: '1px',
    width: '58vw',
    margin: '1vh 22vw 1vh 22vw',
    border: 0,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.default,
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'fit-content',
    margin: '0 0 1vh 28vw',
  },

  input: {
    '& .MuiTextField-root': {
      fontSize: '5vh',
      width: '20vw',
      minWidth: '175px',
      marginBottom: '1vh',
    },

    '& .MuiInputBase-root': {
      borderRadius: '8px',
      height: '37px',
      color: theme.palette.primary.main,
    },
  },

  genderRadioContainer: {
    width: '100%',
  },

  rowContainer: {
    marginLeft: '28vw',
  },

  button: {
    width: 'fit-content',
    height: '37px',
    borderRadius: '8px',
    fontSize: '0.8vw',
    fontWeight: 600,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    '&#languageButton':{
      marginRight: '1vh',
    }
  },

  notificationText: {
    marginTop: '1vh',
    fontSize: '2.5vh',
    color: theme.palette.primary.main,
  },
}));






