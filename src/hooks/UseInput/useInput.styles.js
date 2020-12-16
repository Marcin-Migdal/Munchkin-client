import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: '1vh 0',
      width: '16vw',
    },

    '& .MuiInputBase-root': {
      color: theme.palette.secondary.main
    },
  },
}));