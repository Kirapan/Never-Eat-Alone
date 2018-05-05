import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavItem} from 'react-bootstrap'


const TopNav = (props) => (
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
        <Link to="/users">Find a lunch partner</Link>
      </NavItem>
      <NavItem eventKey={2}>
        <Link to="/clients">Messages</Link>
      </NavItem>
    </Nav>
    <span class="navbar-text my-2 my-lg-0"><Link to='/login'>Login</Link> | <Link to='/logout'>logout</Link></span>
  </Navbar>
)

export default TopNav