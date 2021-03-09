import { makeStyles } from "@material-ui/core";

export const gameSummaryClasses = makeStyles(theme => ({
  scrollContainer: {
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
    fontSize: '4vh',
    marginBottom: '2vh',
    color: theme.palette.primary.main
  },

  placementText: {
    margin: '1vh 0 0.5vh 0.25vw',
    fontSize: '3.5vh',
    color: theme.palette.primary.main
  },

  loaderContainer: {
    position: 'fixed',
    top: '40vh',
    left: '49vw',
  }
}))