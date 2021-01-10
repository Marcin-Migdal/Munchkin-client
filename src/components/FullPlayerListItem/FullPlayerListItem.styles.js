import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  playerContainerDesktop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1vh',
    padding: '0.35vh 1vh',
    border: '1px solid',
    borderRadius: '1.2vh',
    borderColor: theme.palette.primary.main,
    fontSize: '3.5vh',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.background.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.background.active,
    },

    '& p': {
      webkitRouchCallout: 'none',
      webkitUserSelect: 'none',
      khtmlUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
    },
  },

  playerContainerMobile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1vh',
    padding: '0.5vh 0.75vh',
    border: '1px solid',
    borderRadius: '1.2vh',
    fontSize: '3vh',
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,

    '&:active': {
      backgroundColor: theme.palette.background.active,
    },

    '& p': {
      webkitRouchCallout: 'none',
      webkitUserSelect: 'none',
      khtmlUserSelect: 'none',
      mozUserSelect: 'none',
      msUserSelect: 'none',
      userSelect: 'none',
    },
  },

  avatarIcon: {
    height: '3.5vh',
    width: '3.5vh',
    marginRight: '0.75vh',
  },

  levelText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '3.5vh',
    width: '3.5vh',
    marginRight: '0.5vh',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: '100%',
  },

  gender: {
    height: '3.5vh',
    width: '3.5vh',
  },

  rightContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '70%',
  },

  usernameText: {
    width: '80%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));