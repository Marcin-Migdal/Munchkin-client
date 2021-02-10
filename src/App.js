import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ResponsiveComponent from './components/ResponsiveComponent/ResponsiveComponent';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import MainLayout from './containers/MainLayout/Desktop/MainLayout';
import MainLayoutMobile from './containers/MainLayout/Mobile/MainLayoutMobile';
import { desktopClasses } from './components/WelcomePage/WelcomePage.styles'
import { mobileClasses } from './components/WelcomePage/WelcomePageMobile.styles'
import api from './api/api';
import { links } from './utils/linkUtils';
import './App.css'

function App() {
  const HomePage = () => {
    console.log(localStorage.getItem('tokenExpired'))
    if (api.validateToken()) {
      return (
        <ResponsiveComponent
          MobileComponent={<MainLayoutMobile />}
          DesktopComponent={<MainLayout />} />
      )
    } else {
      return (
        < ResponsiveComponent
          MobileComponent={< WelcomePage classes={mobileClasses} />}
          DesktopComponent={< WelcomePage classes={desktopClasses} />} />
      )
    }
  }

  return (
    <Router>
      <Switch>
        <Route path={links.login}>
          <Login />
        </Route>
        <Route path={links.register}>
          <Register />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
