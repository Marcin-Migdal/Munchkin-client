import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },

  addAvatarButton: {
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
    alignItems: 'center',
  },

  fileNameText: {
    width: 'fit-content',
    maxWidth: '20vh',
    marginRight: '0.3vh',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color:theme.palette.primary.main,
  },
}));






