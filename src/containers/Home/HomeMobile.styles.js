import { makeStyles } from "@material-ui/core";

export const homePageClasses = makeStyles( theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
  },
  
  title:{
    color: theme.palette.primary.main,
  },
}));