import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: '10px',
      width: '25ch',
    },

    '& .MuiInputBase-root': {
      color: theme.palette.secondary.main
    },
  },
}));