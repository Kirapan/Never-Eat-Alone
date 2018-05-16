import React from 'react';
import Resource from '../models/resource';
import { Grid, Button } from 'react-bootstrap';
import logo from "./logo.png"
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
    this.setState(...state, { email: event.target.value });
  }

  _udpatePassword(event) {
    const state = this.state;
    this.setState(...state, { password: event.target.value });
  }

  _handleSubmit(event) {
    event.preventDefault();
    console.log("in handle submit", this.state.email, " and ",
      this.state.password);

    if (!this.state.email || !this.state.password) {
      alert('Email and/or Password is required!')
    } else {
      const loginInfo = {
        email: this.state.email,
        password: this.state.password
      }

      userData.login(loginInfo)
      .then((result) => {
        console.log("after login", result);
        localStorage.setItem('Authorization', result);
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
  }

  render() {
    return (<div className="login">
      <img src="http://hdwallpaperbackgrounds.net/wp-content/uploads/2015/09/Space-Light-Desktop-Wallpapers-HD.jpg" alt="background picture" />
      <form onSubmit={this._handleSubmit.bind(this)} className="submit">
        <img className="logo" src={logo} alt="logo" />
        <div class="formgroup">
          <label>E-mail: </label>
          <input id="email" type="email" class="form-control" onChange={this._updateEmail.bind(this)} />
        </div>
        <br />
        <div class="formgroup">
          <label>Password: </label>
          <input type="submit" id="password" type="password" class="form-control"
            onChange={this._udpatePassword.bind(this)} />
        </div>
        <br />
        <div>
          <Button type="submit" className="submitButton" bsStyle="info">Submit</Button>
        </div>
      </form>
    </div>
    )
  }
}

export default Login
