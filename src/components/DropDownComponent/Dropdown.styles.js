import { makeStyles } from "@material-ui/core";

export const classes = makeStyles(theme => ({
  container: {
    position: 'relative',
  },

  openDropMenuButton: {
    borderRadius: '8px',
    fontWeight: 600,
  },

  button: {
    textAlign: 'left',
    padding: '1vh 1vh',
    border: '1px solid',
    borderTop: 0,
    borderColor: theme.palette.primary.main,
    fontSize: '2vh',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    whiteSpace: 'nowrap',

    '&:hover, &:focus': {
      outline: 'none',
      cursor: 'pointer',
      backgroundColor: theme.palette.primary.hover,
    },

    '&:active': {
      outline: 'none',
      cursor: 'pointer',
      backgroundColor: theme.palette.primary.active,
    }
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '47px',
    right: 0,

    '& button:nth-of-type(1)': {
      borderTop: '1px solid',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      borderColor: theme.palette.primary.main,
    },

    '& button:nth-of-type(3)': {
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
    }
  },
}));