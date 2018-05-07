import React from 'react'
import {Link} from 'react-router-dom'
import Resource from '../models/resource'
import {Grid, Row, Col} from 'react-bootstrap'
import {Tabs, Tab} from 'react-bootstrap-tabs';
import jquery from 'jquery'

const userData = Resource('users');

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  componentWillMount() {

  }

  _updateEmail(event) {
    //console.log("in handle submit", event.target.value);
    const state = this.state;
    this.setState(...state, {email: event.target.value});
    //console.log("in handle", this.state.email);
  }

  _udpatePassword(event) {
    //console.log("in handle submit", event.target.value);
    const state = this.state;
    this.setState(...state, {password: event.target.value});
    //console.log("in handle", this.state.email);
  }

  _handleSubmit(event) {
    event.preventDefault();
    console.log("in handle submit", this.state.email, " and ",
      this.state.password);

    const loginInfo = {
      email: this.state.email,
      password: this.state.password
    }

    userData.login(loginInfo)
    .then((result) => {
      userData.verifyToken(result)
      .then((email) => {
        console.log("after verifyToken", email);
        const state = this.state;
        this.setState(...state, {email: email});
      });
    });
    console.log("in handle", this.state);
  }

  render() {
    return (
      <div>
        <Grid>
          <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
            <Tab label="Login">
             <form onSubmit={this._handleSubmit.bind(this)}>
               <div class="formgroup">
                 <label>E-mail: </label>
                 <input id="email" type="email" class="form-control"
                 placeholder="Please enter your email" onChange={this._updateEmail.bind(this)}/>
               </div>
               <div class="formgroup">
                 <label>Password: </label>
                 <input id="password" type="password" class="form-control" placeholder="Please enter your password" onChange={this._udpatePassword.bind(this)}/>
               </div>
               <input type="submit" value="Submit"/>
             </form>
            </Tab>
            <Tab label="Sign up">
              <h3>HOME</h3>
              <p>Some content.</p>
            </Tab>
          </Tabs>
        </Grid>
      </div>
    )
  }
}

export default Login
