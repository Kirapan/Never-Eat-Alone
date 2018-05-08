import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import Parent from './Parent';

class TopNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      isLoggedOut: false
    }
  }

  componentWillMount() {
    console.log("in will mount");
  }

  _logout() {
    console.log("on logout");
    const state = this.state;
    this.props.doLogin(...state, {email: ""});
    this.setState(...state, {email: '', isLoggedOut: false});
  }

  render() {
    const isLoggedOut = this.state.isLoggedOut;
    console.log("in render", isLoggedOut);
    const button = this.props.value ?
    (<span class="navbar-text my-2 my-lg-0">{this.props.value} | <Link to={this._logout}> Logout</Link></span>):
    (<span class="navbar-text my-2 my-lg-0"><Link to='/api/login'>Login</Link> |
      <Link to='/api/login'> Sign up</Link></span>);


    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>
              Never Lunch Alone
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>
            <Link to="/api/users">Find a lunch partner</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link to="/api/messages">Messages</Link>
          </NavItem>
        </Nav>
        {button}
      </Navbar>
    )
  }
}

export default TopNav