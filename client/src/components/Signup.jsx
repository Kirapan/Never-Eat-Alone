import React from 'react';
import Resource from '../models/resource';
import { Grid, Button } from 'react-bootstrap';
import logo from "./logo.png"
const userData = Resource('users');

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    }
  }

  componentWillMount() {

  }

  _updateFirstname(event) {
    const state = this.state;
    this.setState(...state, { firstname: event.target.value });
  }

  _updateLastname(event) {
    const state = this.state;
    this.setState(...state, { lastname: event.target.value });
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

    if (!this.state.firstname || !this.state.lastname ||
        !this.state.email || !this.state.password) {
      alert('Name, Email and/or Password is required!')
    } else {
      const signUpInfo = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password
      }

      userData.signup(signUpInfo)
        .then((result) => {
          console.log("after signup", result);
          userData.login(signUpInfo)
            .then((result) => {
              console.log("after getToken", result);
              userData.verifyToken(result)
                .then((result) => {
                  const state = this.state;
                  this.setState(...state, {
                    id: result.authData.id,
                    email: result.authData.email
                  });
                  this.props.doLogin(this.state);
                  this.props.history.push('/');
                })
                .catch((err) => {
                  console.log("verifyToken not valid");
                });
            })
            .catch((err) => {
              console.log("getToken not valid", err);
            });
        })
        .catch((err) => {
          console.log("login not succesful", err);
        });
    }
  }

  render() {
    return (<div className="login">
    <img src="http://hdwallpaperbackgrounds.net/wp-content/uploads/2015/09/Space-Light-Desktop-Wallpapers-HD.jpg" alt="background picture" />
      <form onSubmit={this._handleSubmit.bind(this)} className="submit">
        <img className="logo" src={logo} alt="logo" />
        <div class="formgroup">
          <label>First Name: </label>
          <input id="firstname" type="text" class="form-control"
            onChange={this._updateFirstname.bind(this)} />
        </div>
        <div class="formgroup">
          <label>Last Name: </label>
          <input id="lastname" type="text" class="form-control"
            onChange={this._updateLastname.bind(this)} />
        </div>
        <div class="formgroup">
          <label>E-mail: </label>
          <input id="email" type="email" class="form-control"
            onChange={this._updateEmail.bind(this)} />
        </div>
        <div class="formgroup">
          <label>Password: </label>
          <input id="password" type="password" class="form-control"
            onChange={this._udpatePassword.bind(this)} />
        </div>
        <div>
          <Button type="submit" className="submitButton" bsStyle="info">Submit</Button>
        </div>
      </form>
    </div>
    )
  }
}

export default Signup
