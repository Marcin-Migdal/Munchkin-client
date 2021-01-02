import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ResponsiveComponent from './components/ResponsiveComponent/ResponsiveComponent';
import DefaultPage from './components/DefaultPage/DefaultPage';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import MainLayout from './containers/MainLayout/Desktop/MainLayout';
import MainLayoutMobile from './containers/MainLayout/Mobile/MainLayoutMobile';
import { desktopClasses } from './components/DefaultPage/DefaultPage.styles'
import { mobileClasses } from './components/DefaultPage/DefaultPageMobile.styles'
import api from './api/api';
import './App.css'

function App() {
  const HomePage = () => {
    if (localStorage.getItem('token') && api.validateToken()) {
      return (
        <ResponsiveComponent
          MobileComponent={<MainLayoutMobile />}
          DesktopComponent={<MainLayout />} />
      )
    } else {
      return (
        < ResponsiveComponent
          MobileComponent={< DefaultPage classes={mobileClasses} />}
          DesktopComponent={< DefaultPage classes={desktopClasses} />} />
      )
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
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
