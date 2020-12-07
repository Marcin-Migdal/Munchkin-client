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
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/mainLayout">
          <ResponsiveComponent
            MobileComponent={<MainLayoutMobile />}
            DesktopComponent={<MainLayout />} />
        </Route>
        <Route path="/">
          <ResponsiveComponent
            MobileComponent={<DefaultPage classes={mobileClasses} />}
            DesktopComponent={<DefaultPage classes={desktopClasses} />} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
