import { makeStyles } from "@material-ui/core";

export const roomClasses = makeStyles(theme => ({
  scrollContainer: {
    width: '100%',
    height: '92vh',
    zIndex: 1,
  },

  topScrollContainer: {
    marginTop: '13vh',
    width: '90vw'
  },

  scrollContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  bottomScrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginTop: '1.25vh',
  },

  errorContainer: {
    display: 'flex',
    justifyContent: 'center',
  },

  addRoomButton: {
    fontSize: '1.75vmin',
    borderRadius: '8px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  button: {
    fontSize: '1.75vmin',
    borderRadius: '8px',
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },
}));