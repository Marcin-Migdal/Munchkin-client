import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DefaultPage from './components/DefaultPage/DefaultPage';
import ResponsiveComponent from './components/ResponsiveComponent/ResponsiveComponent';
import { desktopClasses } from './components/DefaultPage/DefaultPage.styles'
import { mobileClasses } from './components/DefaultPage/DefaultPageMobile.styles'

function App() {
    return (
      <Router>
        <Switch>
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
