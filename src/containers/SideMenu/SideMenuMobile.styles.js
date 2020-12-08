import { makeStyles } from "@material-ui/core";

export const sideMenuClasses = makeStyles( theme => ({
  sideMenuEnabled: {
    display: 'flex',
    flexDirection: 'column',
    width: '90vw',
    height: '100%',
    position: 'fixed',
    left: 0,
    transition: '150ms',
    backgroundColor: theme.palette.background.default,
  },

  sideMenuDisabled: {
    width: '90vw',
    height: '100%',
    position: 'fixed',
    left: '-100%',
    transition: '300ms',
    backgroundColor: theme.palette.background.default,
  },

  sideMenuHr: {
    height: '1px',
    width: '100%',
    border: 0,
    borderColor: theme.palette.secondary.main,
    backgroundColor: theme.palette.secondary.main,
  },

  sideMenuItems: {
    width: '100%',
  },
}));