import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Grid} from 'react-bootstrap'
import Navbar from './Navbar'
import Index from './Index'
import Users from './Users'
import UserProfile from './UserProfile'
import UserPreferences from './UserPreferences'
import Messages from './Messages'
import Login from './Login'
import Footer from './Footer'

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ""
    }
  }

  componentWillMount() {

  }

  _doLogin = (emailInput) => {
    const state = this.state;
    this.setState(...state, {email: emailInput});
  }

  render(){
    return(
      <div>
      <Navbar value={this.state.email}/>
      <Grid>
        <Switch>
          <Route path="/api/users/:id/preferences" component={UserPreferences} />
          <Route path="/api/users/:id" component={UserProfile} />
          <Route path="/api/users" component={Users} />
          <Route path="/api/messages" component={Messages} />
          <Route exact path='/api/login' render={(props) => (
            <Login {...props} doLogin={this._doLogin} />
          )}/>
          <Route path="/" component={Index} />
        </Switch>
      </Grid>
      <Footer/>
      </div>
      )
  }
}

export default Parent;