import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import logo from "./minilogo.png"

class TopNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: ""
    }
  }

  componentWillMount() {
  }

  _logout(e) {
    e.preventDefault();
    const state = this.state;
    this.setState(...state, { email: '' });
    this.props.logout();
  }

  render() {
    const button = this.props.email ?
      (<span className="navbar-text my-2 my-lg-0"><Link to={'/api/users/' + this.props.id}>{this.props.email}</Link> | <Link to='/' onClick={this._logout.bind(this)}> Logout</Link></span>) :
      (<span className="navbar-text my-2 my-lg-0"><Link to='/api/login'>Login</Link> |
      <Link to='/api/signup'> Sign up</Link></span>);

    //const message = this.props.email ?
    //(<Link to={"/api/users/"+ this.props.id + "/messages"}>Messages</Link>) :
    //(<Link to="/api/users">Messages</Link>)

    if (!this.props.email) {
      return (<Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <img className="logo-nav" src={logo} alt="logo-pic" />
            <Link to='/' style={{ margin: "30px" }}>
              Never Lunch Alone
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        {button}
      </Navbar>)
    } else {
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <img className="logo-nav" src={logo} alt="logo-pic" />
              <Link to='/' style={{ margin: "30px" }}>
                Never Lunch Alone
            </Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1}>
              <Link to='/api/maps'>Find a lunch partner</Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to={"/api/users/" + this.props.id + "/messages"}>Messages</Link>
            </NavItem>
            <NavItem eventKey={4}>
              <Link to={'/api/users/' + this.props.id + '/favorites'}>Favorites</Link>
            </NavItem>
          </Nav>
          {button}
        </Navbar>
      )
    }
  }
}

export default TopNav