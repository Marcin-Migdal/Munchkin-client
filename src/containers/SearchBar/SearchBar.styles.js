import { makeStyles } from "@material-ui/core";

export const desktopClasses = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '13vw',
  },

  searchInput: {
    height: '3.75vh',
    width: '20vw',
    padding: '0 0.5vw',
    border: '0px',
    borderRadius: '8px',
    fontSize: '1.75vh',
    '&:focus': {
      outline: 'none'
    }
  },

  searchContent: {
    width: '20vw',
    height: 'fit-content',
    padding:'0 1vh 1vh 1vh',
    
    border:'solid',
    borderWidth:'0 2px 2px 2px',
    borderBottomLeftRadius:'8px',
    borderBottomRightRadius:'8px',
    
    position:'fixed',
    top: '6vh',
    zIndex:3,
    
    borderColor:theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main
  },

  searchError:{
    width: '20vw',
    height: 'fit-content',
    padding:'1vh',
    textAlign:'center',
    
    border:'solid',
    borderWidth:'0 2px 2px 2px',
    borderBottomLeftRadius:'8px',
    borderBottomRightRadius:'8px',
    
    position:'fixed',
    top: '6vh',
    zIndex:3,

    fontSize:'2.5vh',
    color: theme.palette.primary.main,
    
    borderColor:theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main
  },
}))