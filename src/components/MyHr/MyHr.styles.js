import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  hrPrimaryColor: {
    height: '1px',
    width: '100%',
    border: 0,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.background.default,
  },

  hrSecondaryColor: {
    height: '1px',
    width: '100%',
    border: 0,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.main,
  },
}));