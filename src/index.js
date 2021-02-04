import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffcc00',
      hover: '#ffd11a',
      active: '#ffcc00'
    },
    secondary: {
      main: '#ffffff',
      hover: '#f2f2f2',
      active: '#e6e6e6'
    },
    background: {
      default: '#ffd966',
      paper: '#ffe699',
      hover: '#fffbf0',
      active: '#fff1cc'
    },
    current: {
      main: '#ff8080',
      hover: '#ffe6e6',
      active: '#ffcccc'
    },
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