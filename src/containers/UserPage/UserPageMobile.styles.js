import { makeStyles } from "@material-ui/core";

export const userPageClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  topContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10vh 0 1.75vh 0',
  },

  topRightContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  avatarIcon: {
    height: '16vh',
    width: '16vh',
    fontSize: '8vh',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
  },

  nick: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '4vh',
    marginTop: '1.25vw',
    marginLeft: '0.75vw',
    color: theme.palette.primary.main,
  },

  gender: {
    marginLeft: '1vh',
    padding: '0.15vh',
    border: '1px solid',
    borderRadius: '100%',
    fontSize: '5vh',
  },

  editButton: {
    width: '10vh',
    marginTop: '1.5vh',
    fontSize: '2vh',
    borderRadius: '8px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  customHrWide: {
    width: '90vw',
    margin: '0 5vw'
  },

  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100vw',
  },
}));






