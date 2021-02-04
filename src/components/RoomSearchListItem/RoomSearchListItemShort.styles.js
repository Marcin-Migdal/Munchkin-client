import { makeStyles } from "@material-ui/core";

export const roomSearchListItemClasses = () => {
  return makeStyles(theme => ({
    roomContainerDesktop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginTop: '1.25vh',
      padding: '0.5vh 1vh',
      border: '1px solid',
      borderColor: theme.palette.background.paper,
      borderRadius: '8px',
      fontSize: '3vh',
      color: theme.palette.primary.main,

      '& p:nth-of-type(1)': {
        width: '67%',
        fontSize: '3vh',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },

      '& p:nth-of-type(2)': {
        fontSize: '2.25vh',
      },

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
  }));
}