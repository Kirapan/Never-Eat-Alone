import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import './styles/css/main.css'

import Navbar from './components/Navbar'
import Index from './components/Index'
import Users from './components/Users'
import UserProfile from './components/UserProfile'
import Messages from './components/Messages'
import Login from './components/Login'
import Footer from './components/Footer'

const App = (props) => (
  <div>
  <Navbar/>
  <Grid>
    <Switch>
      <Route path="/api/users/:id" component={UserProfile} />
      <Route path="/api/users" component={Users} />
      <Route path="/api/messages" component={Messages} />
      <Route path="/api/login" component={Login} />
      <Route path="/" component={Index} />
    </Switch>
  </Grid>
  <Footer/>
  </div>
)

export default App