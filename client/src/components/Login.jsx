import React from 'react';
import Resource from '../models/resource';
import {Grid} from 'react-bootstrap';

const userData = Resource('users');

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      email: '',
      password: ''
    }
  }

  componentWillMount() {

  }

  _updateEmail(event) {
    const state = this.state;
    this.setState(...state, {email: event.target.value});
  }

  _udpatePassword(event) {
    const state = this.state;
    this.setState(...state, {password: event.target.value});
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
      console.log("after login", result);
      userData.verifyToken(result)
      .then((result) => {
        const state = this.state;
        this.setState(...state, {id: result.authData.id,
                                 email: result.authData.email});
        this.props.doLogin(this.state);
        this.props.history.push('/');
      })
      .catch((err) => {
        console.log("verifyToken not valid");
      });
    })
    .catch((err) => {
      console.log("login not succesful");
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <form onSubmit={this._handleSubmit.bind(this)}>
            <div class="formgroup">
              <label>E-mail: </label>
              <input id="email" type="email" class="form-control"
               onChange={this._updateEmail.bind(this)}/>
            </div>
            <div class="formgroup">
              <label>Password: </label>
              <input id="password" type="password" class="form-control"
               onChange={this._udpatePassword.bind(this)}/>
            </div>
            <input type="submit" value="Submit"/>
          </form>
        </Grid>
      </div>
    )
  }
}

export default Login
