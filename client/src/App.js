import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Grid} from 'react-bootstrap';
import './App.css';
import Navbar from './components/Navbar';
//import Dashboard from './Dashboard';
import UserProfile from './components/UserProfile';
/*
This is the main app component. Note that we're using react-router to change
*part* of the screen - the <TopNav> component stays put. The component that
ends up inside <Grid> is determined by the current browser URL. See
https://reacttraining.com/react-router/web/example/basic for more details.
*/

const App = (props) => (
  <div>
    <Navbar />
    <Grid>
      <Switch>
        <p> Hello</p>
        <Route path="/users" component={UserProfile} />
      </Switch>
    </Grid>
  </div>
)

export default App;