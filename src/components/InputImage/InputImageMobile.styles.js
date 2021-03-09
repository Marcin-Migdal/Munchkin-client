import { makeStyles } from "@material-ui/core";

export const mobileClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent:'center'
  },

  button: {
    marginRight: '1vh',
    borderRadius: '8px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  buttonIcon: {
    marginRight: '0.5vh',
  },

  fileNameContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '0.5vh'
  },

  fileNameText: {
    width: 'fit-content',
    maxWidth: '25vh',
    marginRight: '0.3vh',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main,
  },
}));






