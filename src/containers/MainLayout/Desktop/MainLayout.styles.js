import { makeStyles } from "@material-ui/core";

export const classes = makeStyles( theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  topContainer: {
    height:'7vh',
    backgroundColor:'red'
  },

  bottomContainer: {
    display:'flex',
    flexDirection:'row',
    height:'93vh',
    width:'100vw'
  },

  LeftContainerEnabled: {
    height:'100%',
    width:'23vw',
    backgroundColor:'green'
  },

  LeftContainerDisabled: {
    height:'100%',
    width:'0vw',
    backgroundColor:'green'
  },

  rightContainer: {
    height:'100%',
    width:'100%',
    backgroundColor:'yellow'
  },
}));






