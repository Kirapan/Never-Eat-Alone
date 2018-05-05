import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Grid} from 'react-bootstrap'


import UserProfile from './components/UserProfile'

const App = (props) => (
  <div>
  <Grid>
    <Switch>
      <Route path="/api/users/:id" component={UserProfile} />
    </Switch>
  </Grid>
  </div>
)

export default App
