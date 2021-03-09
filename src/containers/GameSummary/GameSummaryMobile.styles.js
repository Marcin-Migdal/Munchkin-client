import { makeStyles } from "@material-ui/core";

export const gameSummaryClasses = makeStyles(theme => ({
  scrollContainer: {
    height: '91vh',
    zIndex: 1,
  },

  scrollContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    marginTop: '7vh',
  },

  roomNameText: {
    width: '90vw',
    marginBottom: '2vh',
    textAlign: 'center',
    fontSize: '4vh',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.primary.main,
  },

  placementText: {
    margin:'1vh 0 0.5vh 0.25vw',
    fontSize: '2.75vh',
    color: theme.palette.primary.main
  },

  loaderContainer: {
    position: 'fixed',
    top: '30vh',
    left: '45vw',
  }
}))