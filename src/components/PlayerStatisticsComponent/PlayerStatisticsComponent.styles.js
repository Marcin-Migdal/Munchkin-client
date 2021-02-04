import { makeStyles } from "@material-ui/core";

export const classes = ((isCurrentPlayer, modalType) => {
  if (modalType === 'inGame') {
    return makeStyles(theme => ({
      playerStatisticsModal: {
        width: '35vh',
        borderRadius: '8px',
        padding: '0.5vw',
        textAlign: 'center',
        position: 'absolute',
        left: '-6.5vw',
        top: '5vh',
        zIndex: 2,
        color: theme.palette.secondary.main,
        backgroundColor: isCurrentPlayer ? theme.palette.current.main : theme.palette.background.default,

        '& #titleText': {
          fontSize: '3.5vh',
          fontWeight: 500,
        },

        '& #descriptionText': {
          fontSize: '2.5vh',
        },
      },

      playerStatisticsModalMobile: {
        width: '20vh',
        borderRadius: '8.5px',
        padding: '0.5vh',
        textAlign: 'center',
        position: 'absolute',
        right: '-6vh',
        top: '5vh',
        zIndex: 2,
        color: theme.palette.secondary.main,
        backgroundColor: isCurrentPlayer ? theme.palette.current.main : theme.palette.background.default,

        
        '& #titleText': {
          fontSize: '2.25vh',
          fontWeight: 500,
        },

        '& #descriptionText': {
          fontSize: '1.5vh',
        },
      },
    }));
  } else {
    return makeStyles(theme => ({
      playerStatisticsModal: {
        width: '15vw',
        borderRadius: '8px',
        fontSize: '2.5vh',
        padding: '0.5vw',
        textAlign: 'center',
        position: 'absolute',
        right: '-1.5vw',
        top: '4vh',
        zIndex: 2,
        border: '1px solid',
        borderColor: isCurrentPlayer ? theme.palette.current.main : theme.palette.primary.main,
        color: isCurrentPlayer ? theme.palette.current.main : theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main
      },

      playerStatisticsModalMobile: {
        width: '20vh',
        borderRadius: '8.5px',
        fontSize: '1.5vh',
        padding: '0.5vh',
        textAlign: 'center',
        position: 'absolute',
        right: '2vh',
        top: '4vh',
        zIndex: 2,
        color: isCurrentPlayer ? theme.palette.current.main : theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.main
      },
    }));
  }
})