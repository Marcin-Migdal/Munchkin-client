import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffcc00',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#ffd966',
      paper: '#ffecb3'
    }
  }
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root'),
);