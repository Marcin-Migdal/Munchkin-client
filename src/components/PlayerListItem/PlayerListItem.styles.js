import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  roomContainerDesktop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 1vh 1vh 1vh',
    padding: '0 0.75vh',
    height: '5vh',
    border: '1px solid',
    borderRadius: '1.8vh',
    fontSize: '2.5vh',
    color: theme.palette.secondary.main,

    '&:hover': {
      backgroundColor: theme.palette.primary.hover,
    },
    '&:active': {
      backgroundColor: theme.palette.primary.active,
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

  roomContainerMobile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 1vh 1vh 1vh',
    padding: '0 0.75vh',
    height: '5vh',
    width: '33.5vh',
    border: '1px solid',
    borderRadius: '1.8vh',
    fontSize: '2.5vh',
    color: theme.palette.secondary.main,

    '&:active': {
      backgroundColor: theme.palette.primary.active,
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
    borderColor: theme.palette.secondary.main,
    borderRadius: '100%',
  },

  genderMale: {
    height: '3.5vh',
    width: '3.5vh',
  },

  genderFemale: {
    height: '3.5vh',
    width: '3.5vh',
  },

  rightContainer: {
    display: 'flex',
    alignItems:'center',
  },

  leftContainer: {
    display: 'flex',
    alignItems:'center',
    width: '70%',
  },

  usernameText:{
    width: '80%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));