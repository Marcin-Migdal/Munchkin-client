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
    flexDirection: 'row',
    margin: '10vh 0 2.75vh 0',
  },

  topRightContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  avatarIcon: {
    height: '8vw',
    width: '8vw',
    fontSize: '3.5vw',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
  },

  nick: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '2.5vw',
    marginTop: '1.25vw',
    marginLeft: '0.75vw',
    color: theme.palette.primary.main,
  },

  gender: {
    padding: '0.15vw',
    border: '1px solid',
    borderRadius: '100%',
    fontSize: '2.5vw',
    marginLeft: '1.5vh',
  },

  editButton: {
    width: '6vw',
    marginLeft: '0.9vw',
    fontSize: '1vw',
    borderRadius: '8px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  customHrSlime: {
    width: '78vw',
    margin: '0 2vw 0 20vw'
  },

  customHrWide: {
    width: '94vw',
    margin: '0 3vw'
  },

  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '68vw',
    margin: '1vh 0 0 32vw',
  },
}));






