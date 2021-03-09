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
    marginBottom: '7.5vh',
    fontSize: '5vh',
    color: theme.palette.primary.main,
  },

  showSegmentButton: {
    justifyContent: 'space-between',
    width: '60vw',
    margin: '0 20vw',
    borderRadius: '8px',
    fontSize: '1.75vh',
    color: theme.palette.background.main,
    '&.MuiButton-text': {
      padding: '3px 8px',
    }
  },

  customHr: {
    height: '1px',
    width: '70vw',
    margin: '1vh 15vw 1vh 15vw',
    border: 0,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.main,
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50vw',
    margin: '0.5vh 25vw 0 25vw',
  },

  input: {
    '& .MuiTextField-root': {
      width: '50vw',
      marginBottom: '0.75vh',
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

  button: {
    width: 'fit-content',
    height: '37px',
    borderRadius: '8px',
    fontSize: '1.25vh',
    fontWeight: 600,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
    '&#languageButton': {
      marginRight: '1vh',
    }
  },

  notificationText: {
    textAlign: 'center',
    marginTop: '1vh',
    fontSize: '1.5vh',
    color: theme.palette.primary.main,
  },

  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '0.5vh',
  },

  languageContainer: {
    display: 'flex',
    margin: '0.5vh 0 0 21vw',
  },
}));






