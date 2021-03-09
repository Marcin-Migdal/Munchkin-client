import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  input: {
    '& .MuiTextField-root': {
      margin: '1vh 0',
      width: '27ch',
    },

    '& .MuiInputBase-root': {
      color: theme.palette.secondary.main
    },
  },
}));