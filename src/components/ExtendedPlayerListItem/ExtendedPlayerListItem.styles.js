import { makeStyles } from "@material-ui/core";

export const classes = ((isCurrentPlayer) => {
  return makeStyles(theme => ({
    containerDesktop: {
      display: 'flex',
      flexDirection: 'column',
      width: '50vw',
      marginBottom: '1vh',
      border: '1px solid',
      borderRadius: '1.2vh',
      borderColor: isCurrentPlayer ? theme.palette.currentUser.main : theme.palette.primary.main,
      fontSize: '3.5vh',
      backgroundColor: theme.palette.secondary.main,
      color: isCurrentPlayer ? theme.palette.currentUser.main : theme.palette.primary.main,

      '& p': {
        webkitRouchCallout: 'none',
        webkitUserSelect: 'none',
        khtmlUserSelect: 'none',
        mozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
      },

      '& #topContainer': {
        padding: '0.35vh 1vh',
        '&:hover': {
          backgroundColor: isCurrentPlayer ? theme.palette.currentUser.hover : theme.palette.background.hover,
        },
        '&:active': {
          backgroundColor: isCurrentPlayer ? theme.palette.currentUser.active : theme.palette.background.active,
        },
      }
    },

    containerMobile: {
      display: 'flex',
      flexDirection: 'column',
      width: '90vw',
      marginBottom: '1vh',
      border: '1px solid',
      borderRadius: '1.2vh',
      fontSize: '3vh',
      borderColor: isCurrentPlayer ? theme.palette.currentUser.main : theme.palette.primary.main,
      color: isCurrentPlayer ? theme.palette.currentUser.main : theme.palette.primary.main,

      '& p': {
        webkitRouchCallout: 'none',
        webkitUserSelect: 'none',
        khtmlUserSelect: 'none',
        mozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
      },

      '& #topContainer': {
        padding: '0.25vh 0.75vh',
      }
    },

    topContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      borderRadius: '1.2vh',
    },

    leftContainer: {
      display: 'flex',
      alignItems: 'center',
      width: '60%',
    },

    creatorIcon: {
      height: '3.5vh',
      width: '3.5vh',
      marginLeft: '0.75vh',
    },

    usernameText: {
      width: '80%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginLeft: '0.75vh',
    },

    rightContainer: {
      display: 'flex',
      alignItems: 'center',
    },

    textContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '3.5vh',
      width: '3.5vh',
      margin: '0.5vh',
      border: '1px solid',
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
      borderRadius: '16px',
      position: 'relative',
    },

    genderIcon: {
      height: '3.5vh',
      width: '3.5vh',
    },

    customHrStyle: {
      height: '1px',
      width: '100%',
      marginBottom: '0.25vh',
      border: 0,
      borderColor: theme.palette.secondary.main,
      backgroundColor: isCurrentPlayer ? theme.palette.currentUser.active : theme.palette.background.default,
    },

    bottomContainer: {
      padding: '0.35vh 1vh',
      position: 'relative',
    },

    shortCustomHrStyle: {
      height: '1px',
      width: '45%', 
      margin: '0.75vh 0 0.25vh 0',
      border: 0,
      borderColor: theme.palette.secondary.main,
      backgroundColor: isCurrentPlayer ? theme.palette.currentUser.active : theme.palette.background.default,
    },

    raceClassContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
  }))
})