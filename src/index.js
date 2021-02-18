import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import './i18next';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffcc00',
      hover: '#fffbf0',
      active: '#fff1cc',
      darkerHover: '#ffd11a',
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      default: '#ffd966',
      paper: '#ffe699',
    },
    current: {
      main: '#ff8080',
      hover: '#ffe6e6',
      active: '#ffcccc',
    },
    inActive: {
      main: '#cccccc',
      hover: '#f2f2f2',
      active: '#e6e6e6',
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