import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

class TopNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  componentWillMount() {

  }

  render() {
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
        <span className="navbar-text my-2 my-lg-0">
        <Link to='/api/login'>Login</Link> | <Link to='/api/logout'>Sign up</Link></span>
      </Navbar>
    )
  }
}

export default TopNav