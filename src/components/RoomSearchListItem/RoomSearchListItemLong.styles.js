import { makeStyles } from "@material-ui/core";

export const roomSearchListItemClasses = (complete) => {
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
      fontSize: '4vh',
      color: theme.palette.primary.main,
      
      '& p:nth-of-type(1)': {
        width:'67%',
        fontSize: '4vh',
        whiteSpace:'nowrap',
        overflow:'hidden',
        textOverflow:'ellipsis',
      },
  
      '& p:nth-of-type(2)': {
        fontSize: '3vh',
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
  
    roomContainerMobile: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90vw',
      marginTop: '1.25vh',
      padding: '0.3vh 1vh',
      border: '1px solid',
      borderColor: theme.palette.background.paper,
      borderRadius: '8px',
      color: theme.palette.primary.main,
  
      '& p:nth-of-type(1)': {
        width:'65%',
        fontSize: '2.75vh',
        whiteSpace:'nowrap',
        overflow:'hidden',
        textOverflow:'ellipsis',
      },
  
      '& p:nth-of-type(2)': {
        fontSize: '2.5vh',
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