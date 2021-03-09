import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ResponsiveComponent from './components/ResponsiveComponent/ResponsiveComponent';
import WelcomePage from './containers/WelcomePage/WelcomePage';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import MainLayout from './containers/MainLayout/Desktop/MainLayout';
import MainLayoutMobile from './containers/MainLayout/Mobile/MainLayoutMobile';
import { desktopClasses } from './containers/WelcomePage/WelcomePage.styles'
import { mobileClasses } from './containers/WelcomePage/WelcomePageMobile.styles'
import { links } from './utils/linkUtils';
import FallbackLoading from './components/FallbackLoading/FallbackLoading';
import api from './api/api';
import './App.css'

export default function App() {
  const HomePage = () => {
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
    <Suspense fallback={<FallbackLoading />}>
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
    </Suspense>
  );
}
