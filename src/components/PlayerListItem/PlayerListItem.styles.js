import { makeStyles } from "@material-ui/core";

export const classes = (color) => {
  return makeStyles(theme => ({
    containerDesktop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '50vw',
      marginBottom: '1vh',
      padding: '0.35vh 1vh',
      border: '1px solid',
      borderRadius: '1.2vh',
      borderColor: color.main,
      fontSize: '3.5vh',
      backgroundColor: theme.palette.secondary.main,
      color: color.main,
      '&:hover': {
        backgroundColor: color.hover,
      },
      '&:active': {
        backgroundColor: color.active,
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

    containerMobile: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90vw',
      marginBottom: '1vh',
      padding: '0.5vh 0.75vh',
      border: '1px solid',
      borderRadius: '1.2vh',
      fontSize: '3vh',
      borderColor: color.main,
      color: color.main,

      '&:active': {
        backgroundColor: color.active,
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

    textContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '3.5vh',
      width: '3.5vh',
      margin: '0.5vh',
      border: '1px solid',
      borderColor: color.main,
      borderRadius: '100%',
      position: 'relative',
    },

    bigTextContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '3.5vh',
      minWidth: '3.5vh',
      margin: '0.5vh',
      padding: '0.35vw',
      border: '1px solid',
      borderColor: color.main,
      borderRadius: '16px',
      position: 'relative',
    },

    genderIcon: {
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
      width: '60%',
    },

    usernameText: {
      width: '80%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginLeft: '0.5vh',
    },

    creatorIcon: {
      height: '4vh',
      width: '4vh',
      marginLeft: '0.5vh',
    },
  }));
}